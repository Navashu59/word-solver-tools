#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const root = path.resolve(process.argv[2] || "public");
const configPath = path.resolve(process.argv[3] || "planning/content-quality.json");
const config = fs.existsSync(configPath) ? JSON.parse(fs.readFileSync(configPath, "utf8")) : {};

const defaults = {
  similarityThreshold: 0.78,
  minimumWords: 120,
  paragraphMinChars: 90,
  maxRepeatedParagraphPages: 2,
  maxRepeatedHeadingPages: 8,
  ignoredHeadings: [],
  ignoredParagraphPatterns: [],
  allowedPairs: [],
  allowedPairPatterns: [],
  minimumWordExemptPaths: [],
  bannedPhrases: [
    "searchers use this phrase",
    "search console data shows",
    "built for searches",
    "keyword volume",
    "semrush"
  ],
  sourceRequiredPrefixes: [],
  sourceLinkPatterns: []
};
const rules = { ...defaults, ...config };

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}

function decode(value) {
  const entities = {
    amp: "&", lt: "<", gt: ">", quot: "\"", apos: "'", nbsp: " ",
    ndash: "-", mdash: "-", rsquo: "'", lsquo: "'", rdquo: "\"", ldquo: "\""
  };
  return value
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (match, name) => entities[name.toLowerCase()] ?? match);
}

function textOnly(value) {
  return decode(value)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalize(value) {
  return textOnly(value)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function capture(html, tag) {
  return [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi"))]
    .map((match) => textOnly(match[1]))
    .filter(Boolean);
}

function removeAuditExcluded(html) {
  let output = html;
  const pattern = /<(section|article|aside|div)\b[^>]*data-audit-exclude[^>]*>[\s\S]*?<\/\1>/gi;
  let previous;
  do {
    previous = output;
    output = output.replace(pattern, " ");
  } while (output !== previous);
  return output;
}

function pageUrl(file) {
  const rel = path.relative(root, file).replaceAll(path.sep, "/");
  if (rel === "index.html") return "/";
  return `/${rel.replace(/index\.html$/, "")}`;
}

function isIgnored(value, patterns) {
  return patterns.some((pattern) => new RegExp(pattern, "i").test(value));
}

function shingles(value, size = 5) {
  const words = normalize(value).split(" ").filter(Boolean);
  const result = new Set();
  for (let i = 0; i <= words.length - size; i += 1) result.add(words.slice(i, i + size).join(" "));
  return result;
}

function jaccard(left, right) {
  if (!left.size || !right.size) return 0;
  let intersection = 0;
  for (const value of left) if (right.has(value)) intersection += 1;
  return intersection / (left.size + right.size - intersection);
}

function allowedPair(a, b) {
  const exact = rules.allowedPairs.some((pair) => {
    const [left, right] = pair;
    return (a === left && b === right) || (a === right && b === left);
  });
  const patterned = rules.allowedPairPatterns.some(([left, right]) => (
    (new RegExp(left).test(a) && new RegExp(right).test(b))
    || (new RegExp(left).test(b) && new RegExp(right).test(a))
  ));
  return exact || patterned;
}

if (!fs.existsSync(root)) {
  console.error(`Content audit: build directory not found: ${root}`);
  process.exit(2);
}

const pages = walk(root)
  .filter((file) => file.endsWith(".html"))
  .map((file) => {
    const html = fs.readFileSync(file, "utf8");
    const robots = html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)/i)?.[1] || "index,follow";
    const rawMain = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || "";
    const main = removeAuditExcluded(rawMain);
    const url = pageUrl(file);
    const body = textOnly(main);
    return {
      file,
      url,
      html,
      main,
      body,
      wordCount: normalize(body).split(" ").filter(Boolean).length,
      indexable: !/noindex/i.test(robots),
      paragraphs: capture(main, "p").filter((p) => p.length >= rules.paragraphMinChars && !isIgnored(p, rules.ignoredParagraphPatterns)),
      headings: [...capture(main, "h2"), ...capture(main, "h3")].filter((h) => !isIgnored(h, rules.ignoredHeadings)),
      shingles: shingles(body)
    };
  })
  .filter((page) => page.indexable && page.url !== "/404.html");

const failures = [];
const warnings = [];

for (const page of pages) {
  if (page.wordCount < rules.minimumWords && !isIgnored(page.url, rules.minimumWordExemptPaths)) {
    failures.push(`${page.url}: only ${page.wordCount} main-content words`);
  }
  if (/\*\*[^*]+\*\*/.test(page.main)) failures.push(`${page.url}: unresolved Markdown bold markers`);
  for (const phrase of rules.bannedPhrases) {
    if (page.body.toLowerCase().includes(phrase.toLowerCase())) failures.push(`${page.url}: internal SEO phrase "${phrase}"`);
  }
  if (rules.sourceRequiredPrefixes.some((prefix) => page.url.startsWith(prefix))) {
    const hasSource = rules.sourceLinkPatterns.some((pattern) => new RegExp(pattern, "i").test(page.main));
    if (!hasSource) failures.push(`${page.url}: no approved source link found`);
  }
}

const paragraphOwners = new Map();
for (const page of pages) {
  for (const paragraph of new Set(page.paragraphs.map(normalize))) {
    if (!paragraphOwners.has(paragraph)) paragraphOwners.set(paragraph, []);
    paragraphOwners.get(paragraph).push(page.url);
  }
}
for (const [paragraph, owners] of paragraphOwners) {
  if (owners.length > rules.maxRepeatedParagraphPages) {
    failures.push(`paragraph repeated on ${owners.length} pages: "${paragraph.slice(0, 120)}..."`);
  }
}

const headingOwners = new Map();
for (const page of pages) {
  for (const heading of new Set(page.headings.map(normalize))) {
    if (!headingOwners.has(heading)) headingOwners.set(heading, []);
    headingOwners.get(heading).push(page.url);
  }
}
for (const [heading, owners] of headingOwners) {
  if (owners.length > rules.maxRepeatedHeadingPages) {
    failures.push(`heading repeated on ${owners.length} pages: "${heading}"`);
  }
}

const similar = [];
for (let i = 0; i < pages.length; i += 1) {
  for (let j = i + 1; j < pages.length; j += 1) {
    const left = pages[i];
    const right = pages[j];
    const score = jaccard(left.shingles, right.shingles);
    if (score >= rules.similarityThreshold && !allowedPair(left.url, right.url)) {
      similar.push({ left: left.url, right: right.url, score: Number(score.toFixed(3)) });
      failures.push(`${left.url} and ${right.url}: main-content similarity ${score.toFixed(3)}`);
    } else if (score >= rules.similarityThreshold - 0.05) {
      warnings.push(`${left.url} and ${right.url}: near threshold at ${score.toFixed(3)}`);
    }
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  root,
  indexablePages: pages.length,
  failures: [...new Set(failures)],
  warnings: [...new Set(warnings)],
  similar
};

console.log(JSON.stringify(report, null, 2));
if (report.failures.length) {
  console.error(`Content audit failed with ${report.failures.length} release-blocking issue(s).`);
  process.exit(1);
}
console.log(`Content audit passed for ${pages.length} indexable page(s).`);
