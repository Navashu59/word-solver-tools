#!/usr/bin/env node

const host = process.env.INDEXNOW_HOST;
const key = process.env.INDEXNOW_KEY;
const urlList = process.argv.slice(2);

if (!host || !key || urlList.length === 0) {
  console.error("Usage: INDEXNOW_HOST=example.com INDEXNOW_KEY=<key> node scripts/indexnow-submit.mjs <url> [...urls]");
  process.exit(1);
}

const normalizedHost = host.toLowerCase();
const invalidUrl = urlList.find((value) => {
  try {
    const parsed = new URL(value);
    return parsed.protocol !== "https:" || parsed.hostname.toLowerCase() !== normalizedHost;
  } catch {
    return true;
  }
});

if (invalidUrl) {
  console.error(`Refusing URL outside https://${normalizedHost}: ${invalidUrl}`);
  process.exit(1);
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: normalizedHost, key, keyLocation: `https://${normalizedHost}/${key}.txt`, urlList }),
});

if (!response.ok) {
  console.error(`IndexNow request failed: ${response.status} ${await response.text()}`);
  process.exit(1);
}

console.log(`IndexNow accepted ${urlList.length} URL(s) for ${normalizedHost}.`);
