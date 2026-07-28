const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");
const pages = JSON.parse(fs.readFileSync(path.join(root, "planning/page-map.json"), "utf8")).pages;
const guideData = JSON.parse(fs.readFileSync(path.join(root, "planning/strategy-guides.json"), "utf8"));
const sitemapLastmod = process.env.SITEMAP_LASTMOD || "2026-07-28";
const gaMeasurementId = process.env.GA_MEASUREMENT_ID || "G-EHPNMH60G4";

const site = {
  name: "Word Solver Tools",
  origin: process.env.SITE_ORIGIN || "https://wordsolvertools.org",
  description: "Fast word unscrambler, word finder, anagram, crossword, and word game solver tools.",
  themeColor: "#0f766e",
  socialImage: "/assets/social-card.svg",
  legalName: "Word Solver Tools",
};

const review = {
  date: "2026-07-24",
  label: "Last reviewed: July 2026",
  authorName: "Independent Developer",
  authorBio: "Built as a practical word-game helper focused on fast client-side filtering, clear puzzle constraints, and transparent limitations.",
  methodNote: "The current tool filters a built-in English word list in the browser. It is not an official dictionary and results should be checked against the rules or word list for the game you are playing.",
};

const staticPages = [
  {
    slug: "about",
    url: "/about/",
    title: "About Word Solver Tools",
    description: "Learn how Word Solver Tools helps people solve word games, letter puzzles, anagrams, crossword clues, and word patterns.",
    h1: "About Word Solver Tools",
    eyebrow: "About",
    body: [
      ["h2", "About Word Solver Tools"],
      ["p", "Word Solver Tools is an independent, browser-based utility for finding words from letters, patterns, and puzzle filters. It is built for people who already have a board, clue, rack, or word game open and need a short list of candidates they can check quickly."],
      ["h2", "What the site covers"],
      ["p", "The site focuses on practical word-solving tasks: unscrambling letters, finding words with specific letters, checking five-letter possibilities, narrowing crossword patterns, exploring anagrams, and handling common word-game constraints such as wildcards or excluded letters."],
      ["h2", "How the tools are maintained"],
      ["p", "The tools use a built-in English word list and client-side filters. The list is broad enough for everyday puzzle solving, but it is not an official dictionary for every game, app, or publisher. Treat results as candidates and confirm important plays against the rule set you are using."],
      ["h2", "Independence"],
      ["p", "Word Solver Tools is not affiliated with Scrabble, Wordle, The New York Times, Words With Friends, or any other named game or organization. Those names are used only to describe the type of puzzle a page can help with."],
    ],
  },
  {
    slug: "how-it-works",
    url: "/how-it-works/",
    title: "How Word Solver Tools Works",
    description: "See how the word solver, unscrambler, Wordle helper, crossword helper, and anagram tools filter and rank possible words.",
    h1: "How the word tools work",
    eyebrow: "Method",
    body: [
      ["h2", "Inputs"],
      ["p", "Most pages start with the information you already have: loose letters, a rack, a clue pattern, fixed positions, required letters, or excluded letters. You can add filters such as length, contains, starts with, ends with, and pattern matching with question marks for unknown letters."],
      ["h2", "Filtering"],
      ["p", "The solver checks the built-in word list against those constraints in the browser. A word is removed when it does not fit the letters, pattern, length, or exclusion rules you entered. Different pages adjust the defaults for different puzzle types, such as five-letter searches for Wordle-style pages or center-letter requirements for spelling pages."],
      ["h2", "Sorting and scanning"],
      ["p", "Results are grouped or sorted to make scanning easier. Some pages favor longer words, some favor score-style candidates, and some focus on matching a fixed pattern. The goal is to reduce a large word list into a set you can inspect quickly."],
      ["h2", "Limits"],
      ["p", "No single word list matches every game, dictionary, app, or house rule. A result means the word fits the filters you entered, not that it is guaranteed to be accepted by a specific game. Check serious plays against the official rules for your game."],
      ["h2", "Privacy"],
      ["p", "The site does not require an account, and the solving logic runs in the browser. Analytics and hosting logs are used for aggregate page-performance and usage measurement."],
    ],
  },
  {
    slug: "privacy",
    url: "/privacy/",
    title: "Privacy Policy",
    description: "Privacy policy for Word Solver Tools, including how puzzle input and basic site usage are handled.",
    h1: "Privacy Policy",
    eyebrow: "Privacy",
    body: [
      ["p", "Word Solver Tools is a static website designed to run word-solving features in your browser. The current tools do not require registration or account login."],
      ["h2", "Puzzle input"],
      ["p", "Letters, patterns, and filters you type into the tools are processed in your browser for the current session. They are not needed for account creation or personal identification."],
      ["h2", "Analytics and hosting"],
      ["p", "Google Analytics and hosting providers may collect standard technical information such as page views, device type, browser type, referring pages, approximate location, and request logs. Puzzle inputs are not required for account creation or personal identification."],
      ["h2", "Contact"],
      ["p", "Use the contact page for privacy-related questions after the production domain is connected."],
    ],
  },
  {
    slug: "terms",
    url: "/terms/",
    title: "Terms of Use",
    description: "Terms of use for Word Solver Tools, an independent collection of word game and puzzle solving tools.",
    h1: "Terms of Use",
    eyebrow: "Terms",
    body: [
      ["p", "Word Solver Tools provides free word game and puzzle helpers for personal use. The tools are provided as-is and may return broad or imperfect results depending on the letters, filters, and word list available."],
      ["h2", "No affiliation"],
      ["p", "References to games, puzzles, or brands are descriptive only. Word Solver Tools is not affiliated with Scrabble, Wordle, The New York Times, Words With Friends, or other named games and publishers."],
      ["h2", "Use of results"],
      ["p", "You are responsible for checking whether a result is valid for the specific game, dictionary, puzzle, or house rule you are using."],
    ],
  },
  {
    slug: "contact",
    url: "/contact/",
    title: "Contact Word Solver Tools",
    description: "Contact Word Solver Tools about corrections, word list issues, content questions, or site feedback.",
    h1: "Contact",
    eyebrow: "Feedback",
    body: [
      ["p", "Contact information will be added after the production domain and public email routing are ready."],
      ["h2", "Report word list issues"],
      ["p", "If you notice a missing word, an unexpected result, or a filter that behaves incorrectly, include the page URL, the letters or pattern you entered, the filters you used, and what you expected to see."],
      ["h2", "Game and publisher questions"],
      ["p", "Word Solver Tools is independent and cannot provide official support for Scrabble, Wordle, The New York Times, Words With Friends, or other games. For official rule disputes or account issues, use the publisher's own support channel."],
    ],
  },
];

const guideUrl = (guide) => `/${guide.slug}/`;
const activeToolPageUrls = new Set([
  "/word-unscrambler/",
  "/scrabble-word-finder/",
  "/word-finder/",
  "/wordle-solver/",
  "/anagram-solver/",
  "/crossword-solver/",
  "/crossword-puzzle-solver/",
  "/crossword-clue-solver/",
  "/crossword-pattern-solver/",
  "/missing-letters-solver/",
  "/jumble-solver/",
  "/5-letter-word-finder/",
  "/word-finder-by-length/",
  "/word-search-solver/",
  "/words-with-these-letters/",
  "/word-generator-from-letters/",
  "/word-solver/",
  "/scrabble-cheat/",
  "/words-with-friends-cheat/",
  "/spelling-bee-solver/",
  "/boggle-solver/",
  "/cryptogram-solver/"
]);
const inactivePageUrls = new Set(pages.filter((page) => !activeToolPageUrls.has(page.url)).map((page) => page.url));
const retiredRedirects = new Map([
  ["/wordle-helper/", "/wordle-solver/"],
  ["/wordle-finder/", "/wordle-solver/"],
  ["/wordle-cheat/", "/wordle-solver/"],
]);
const activePages = () => pages.filter((page) => !inactivePageUrls.has(page.url));

function guidesForTool(page) {
  return guideData.guides.filter((guide) => Array.isArray(guide.parent_tools) && guide.parent_tools.includes(page.url));
}

const allSitemapUrls = () => [
  "/",
  "/tools/",
  "/guides/",
  ...activePages().map((page) => page.url),
  ...guideData.guides.map(guideUrl),
  ...staticPages.map((page) => page.url),
];

function sitemapLastmodFor(url) {
  if (url === "/" || url === "/tools/" || url === "/guides/") return sitemapLastmod;
  const toolPage = pages.find((page) => page.url === url);
  if (toolPage) return sitemapLastmod;
  const guide = guideData.guides.find((item) => guideUrl(item) === url);
  if (guide) return guide.date_modified || sitemapLastmod;
  return sitemapLastmod;
}

const seedDictionary = [
  "about","above","actor","acute","adapt","admit","adore","after","again","agent","agree","alert","alien","align","alike","alive","allow","alone","along","alter","amber","angle","apple","apply","arena","argue","arise","array","aside","asset","audio","avoid","awake","award","aware","badge","baker","basic","beach","began","begin","being","below","bench","berry","birth","black","blade","blank","blend","block","board","brain","brand","brave","bread","break","brick","bring","broad","brown","brush","build","cable","carry","catch","cause","chain","chair","chart","cheap","check","chess","chief","child","claim","class","clean","clear","climb","clock","close","cloud","coach","coast","color","could","count","court","cover","craft","crane","crash","cream","cross","crowd","crown","daily","dance","dealt","death","debug","delay","delta","depth","diary","digit","dirty","doubt","draft","drain","dream","dress","drink","drive","eager","early","earth","eight","elite","empty","enter","equal","error","event","every","exact","faith","false","fault","field","fifth","final","first","flame","flash","floor","focus","force","forth","found","frame","fresh","front","fruit","giant","given","glass","globe","glory","grace","grade","grain","grant","graph","great","green","group","guard","guess","guide","habit","happy","heart","heavy","hello","honey","honor","house","human","ideal","image","index","input","issue","joint","judge","known","label","large","laser","later","laugh","layer","learn","leave","legal","level","light","limit","local","logic","loose","lucky","magic","major","maker","march","match","maybe","media","metal","minor","model","money","month","moral","motor","mount","mouse","music","never","night","noise","north","novel","nurse","ocean","offer","often","olive","onset","order","other","outer","paint","panel","paper","party","peace","phase","phone","photo","piano","piece","pilot","pitch","place","plain","plane","plant","plate","point","power","press","price","pride","prime","print","proof","queen","query","quick","quiet","radio","raise","range","rapid","ratio","reach","react","ready","realm","refer","reply","reset","right","river","rough","round","route","scale","scene","score","scope","scrap","scrub","search","serve","seven","shade","shake","shape","share","sharp","sheet","shift","shine","shirt","shock","short","shown","sight","since","skill","sleep","slice","smart","smile","solid","solve","sound","south","space","spare","speak","speed","spell","spend","split","sport","stack","stage","stand","start","state","steam","steel","still","stone","store","story","study","style","sugar","table","taken","teach","thank","their","theme","there","thick","thing","think","third","three","throw","tight","timer","title","today","topic","total","touch","tower","trace","track","trade","train","treat","trend","trial","trick","trust","truth","under","union","until","upper","upset","usage","value","video","visit","vital","voice","waste","watch","water","wheel","where","which","while","white","whole","whose","world","worry","worth","would","write","wrong","yield","young","zebra",
  "act","arc","are","art","bar","bat","cab","can","cap","car","cat","ear","eat","era","far","fat","for","hat","ice","ink","jar","lap","let","map","net","pat","rat","sat","tar","tea","ten","top","use","war","word","words","solver","finder","letter","letters","anagram","crossword","scrabble","jumble","boggle","cryptogram","ladder","search","puzzle","helper","answer","answers","hint","hints"
];

function loadDictionary() {
  const systemDict = "/usr/share/dict/words";
  const words = new Set(seedDictionary.map((word) => word.toLowerCase()));
  if (fs.existsSync(systemDict)) {
    const rawWords = fs.readFileSync(systemDict, "utf8").split(/\r?\n/);
    for (const word of rawWords) {
      const normalized = word.toLowerCase();
      if (/^[a-z]{2,15}$/.test(normalized)) words.add(normalized);
    }
  }
  return [...words].sort((a, b) => a.length - b.length || a.localeCompare(b));
}

const dictionary = loadDictionary();

const clusterLinks = [
  "/word-unscrambler/","/word-finder/","/words-with-these-letters/","/anagram-solver/",
  "/scrabble-word-finder/","/wordle-solver/","/crossword-solver/","/missing-letters-solver/","/word-finder-by-length/","/5-letter-word-finder/"
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function readDraft(rank, slug) {
  const file = path.join(root, "content-drafts", `${String(rank).padStart(2, "0")}-${slug}.md`);
  return fs.readFileSync(file, "utf8");
}

function slugTitle(text) {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function inlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/&lt;a href=&quot;([^&]+)&quot;&gt;([^&]+)&lt;\/a&gt;/g, '<a href="$1">$2</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\((\/[^)]+)\)/g, '<a href="$2">$1</a>');
}

function blocksToHtml(blocks) {
  return blocks.map(([type, value]) => {
    if (type === "h2") return `<h2>${inlineMarkdown(value)}</h2>`;
    if (type === "h3") return `<h3>${inlineMarkdown(value)}</h3>`;
    if (type === "ul") return `<ul>${value.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ul>`;
    return `<p>${inlineMarkdown(value)}</p>`;
  }).join("");
}

function sourcesHtml(sources) {
  if (!Array.isArray(sources) || sources.length === 0) return "";
  const items = sources
    .map((source) => `<li><a href="${escapeHtml(source.url)}" rel="noopener">${escapeHtml(source.title)}</a>${source.note ? `: ${escapeHtml(source.note)}` : ""}</li>`)
    .join("");
  return `<section class="sources-note" data-audit-exclude><h2>Sources and limits</h2><ul>${items}</ul><p>${escapeHtml(review.methodNote)}</p></section>`;
}

function pageAction(page) {
  const mode = modeFor(page);
  if (page.url === "/missing-letters-solver/") return "Find words from known letters and ? blanks when part of the answer is missing.";
  if (page.url === "/word-finder-by-length/") return "Find words by exact length, then narrow the list with letters, patterns, starts, ends, contains, and excludes.";
  if (page.url === "/crossword-pattern-solver/") return "Search crossword-style answer patterns with known letters and ? blanks.";
  const byMode = {
    crossword: `Solve ${page.title.toLowerCase()} clues with known letters, blank spots, and length filters.`,
    boggle: `Find playable words from your Boggle board letters and narrow the list by length or required letters.`,
    cryptogram: `Work through cryptogram patterns with known letters, unknown positions, and quick candidate words.`,
    ladder: `Find word ladder steps by matching length, letters, and possible word changes.`,
    spelling: `Find Spelling Bee words from your seven letters, including the required center letter.`,
    wordle: `Find Wordle guesses from known letters, excluded letters, and five-letter patterns.`,
    scrabble: `Find candidate Scrabble-style and word-game plays from your rack letters, blanks, and board constraints.`,
    anagram: `Turn letters or a phrase into anagrams, then filter the answers by length and letter rules.`,
    letters: `Enter your letters and find words that match your length, pattern, and letter filters.`,
  };
  return byMode[mode] || byMode.letters;
}

function clusterLabel(page) {
  const labels = {
    "unscramble-scramble": "word unscrambler",
    scrabble: "Scrabble word finder",
    "word-finder": "word finder",
    "wordle-letter-patterns": "Wordle helper",
    anagram: "anagram solver",
    crossword: "crossword solver",
    "word-search": "word search solver",
    "words-with-friends": "Words With Friends helper",
    "spelling-bee": "Spelling Bee solver",
    boggle: "Boggle solver",
    cryptogram: "cryptogram solver",
    "word-ladder": "word ladder solver",
  };
  return labels[page.cluster] || page.cluster.replaceAll("-", " ");
}

function pageDescription(page) {
  const keyword = page.keyword;
  const base = pageAction(page);
  return `${page.title}: ${base} Free to use in your browser.`;
}

function absoluteUrl(url) {
  return `${site.origin}${url}`;
}

function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${site.origin}/#organization`,
    name: site.legalName,
    url: `${site.origin}/`,
    logo: `${site.origin}/favicon.svg`,
  };
}

function breadcrumbSchema(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

function extractFaq(md, page) {
  const normalized = normalizeContentCopy(md, page);
  const commonQuestions = normalized.split(/\n## Common Questions\n/)[1] || "";
  const faqs = [];
  const matches = commonQuestions.matchAll(/### ([^\n]+)\n+([\s\S]*?)(?=\n### |\n## |\n# |$)/g);
  for (const match of matches) {
    const question = match[1].trim();
    const answer = match[2]
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    if (question && answer) faqs.push({ question, answer });
  }
  return faqs.slice(0, 6);
}

function modifiedDate(item) {
  return item.date_modified || review.date;
}

function graphSchema(nodes) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": nodes,
  });
}

function normalizeContentCopy(text, page) {
  const withoutRepeatedSections = text
    .replace(/\n## Choose the right word tool[\s\S]*?(?=\n## |\s*$)/g, "")
    .replace(/\n## Before you use the word list[\s\S]*?(?=\n## |\s*$)/g, "")
    .replace(/\n## Common Questions[\s\S]*?(?=\n## |\s*$)/g, "");
  return withoutRepeatedSections
    .replaceAll(`Use this page when the user has scrambled letters and needs words that can be made from them.`, `Use this page when you have scrambled letters and need words that can be made from them.`)
    .replaceAll(`Use this page when the user has letters or word constraints and needs matching English words quickly.`, `Use this page when you have letters, patterns, or word constraints and need matching English words quickly.`)
    .replaceAll(`Use this page when the user has green, yellow, and gray letters and needs possible next guesses.`, `Use this page when you have green, yellow, and gray letters and need possible next guesses.`)
    .replaceAll(`Use this page when the user has a crossword clue, known letters, and blank positions.`, `Use this page when you have a crossword clue, known letters, and blank positions.`)
    .replaceAll(`Use this page when the user has seven letters and a required center letter and needs hints or valid words.`, `Use this page when you have seven letters, a required center letter, and need valid words or hints.`)
    .replaceAll(`Use this page when the user has a Boggle board and wants all connected words.`, `Use this page when you have a Boggle board and want possible words from the letters.`)
    .replaceAll(`Use this page when the user needs help with a cryptogram pattern or substitution puzzle.`, `Use this page when you need help with a cryptogram pattern or substitution puzzle.`)
    .replaceAll(`Use this page when the user needs a valid chain between two same-length words.`, `Use this page when you need a valid chain between two same-length words.`)
    .replaceAll(`Use this page when the user`, `Use this page when you`)
    .replaceAll(`the user has`, `you have`)
    .replaceAll(`the user needs`, `you need`)
    .replaceAll(`the user wants`, `you want`)
    .replaceAll(`what you already know`, `what you already know`)
    .replaceAll(`Set an exact length, or an exact length.`, `Set an exact length when the puzzle fixes the answer size.`)
    .replaceAll(`manually check whether a result uses every letter on.`, `manually check whether a result uses every required letter.`)
    .replaceAll(`for ${page.keyword} to enter`, `to enter`);
}

function markdownToHtml(md) {
  md = normalizeContentCopy(md, arguments[1] || {});
  const lines = md.split(/\r?\n/);
  let html = "";
  let listOpen = false;

  function closeList() {
    if (listOpen) {
      html += "</ul>";
      listOpen = false;
    }
  }

  for (const line of lines) {
    if (!line.trim()) {
      closeList();
      continue;
    }
    if (line.startsWith("# ")) continue;
    if (line.startsWith("## ")) {
      closeList();
      html += `<h2>${inlineMarkdown(line.slice(3))}</h2>`;
      continue;
    }
    if (line.startsWith("### ")) {
      closeList();
      html += `<h3>${inlineMarkdown(line.slice(4))}</h3>`;
      continue;
    }
    if (/^\d+\.\s/.test(line)) {
      closeList();
      html += `<p>${inlineMarkdown(line.replace(/^\d+\.\s/, ""))}</p>`;
      continue;
    }
    if (line.startsWith("- ")) {
      if (!listOpen) {
        html += "<ul>";
        listOpen = true;
      }
      html += `<li>${inlineMarkdown(line.slice(2))}</li>`;
      continue;
    }
    closeList();
    html += `<p>${inlineMarkdown(line)}</p>`;
  }
  closeList();
  return html;
}

function modeFor(page) {
  if (page.url === "/missing-letters-solver/" || page.url === "/crossword-pattern-solver/") return "crossword";
  if (page.url === "/word-finder-by-length/") return "length";
  if (page.cluster === "scrabble") return "scrabble";
  if (page.cluster === "words-with-friends") return "scrabble";
  if (page.cluster === "wordle-letter-patterns") return "wordle";
  if (page.cluster === "crossword") return "crossword";
  if (page.cluster === "spelling-bee") return "spelling";
  if (page.cluster === "boggle") return "boggle";
  if (page.cluster === "cryptogram") return "cryptogram";
  if (page.cluster === "word-ladder") return "ladder";
  if (page.cluster === "word-search") return "wordsearch";
  if (page.cluster === "anagram") return "anagram";
  return "letters";
}

function ownerDefaults(page) {
  return {
    exact: ["/word-unscrambler/", "/jumble-solver/", "/anagram-solver/"].includes(page.url),
    length: page.cluster === "wordle-letter-patterns" ? "5" : ""
  };
}

function schema(page, draft) {
  const pageUrl = absoluteUrl(page.url);
  const faqs = extractFaq(draft, page);
  const pageModified = modifiedDate(page);
  const nodes = [
    organizationSchema(),
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: page.title,
      description: pageDescription(page),
      isPartOf: { "@id": `${site.origin}/#website` },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      mainEntity: { "@id": `${pageUrl}#tool` },
      dateModified: pageModified,
      reviewedBy: {
        "@type": "Person",
        name: review.authorName,
      },
    },
    {
      "@type": "WebApplication",
      "@id": `${pageUrl}#tool`,
      name: page.title,
      applicationCategory: "GameApplication",
      operatingSystem: "Any",
      url: pageUrl,
      description: pageDescription(page),
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: page.first_screen_tool || [],
      dateModified: pageModified,
    },
    {
      ...breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Tools", url: "/tools/" },
        { name: page.title, url: page.url },
      ]),
      "@id": `${pageUrl}#breadcrumb`,
    },
  ];
  if (faqs.length) {
    nodes.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }
  return graphSchema(nodes);
}

function layout({ title, description, body, canonical = "/", image = site.socialImage, schemaJson = "", robots = "index,follow,max-image-preview:large" }) {
  const canonicalUrl = `${site.origin}${canonical}`;
  const imageUrl = image.startsWith("http") ? image : `${site.origin}${image}`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="robots" content="${escapeHtml(robots)}">
  <meta name="theme-color" content="${site.themeColor}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${escapeHtml(site.name)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:image:alt" content="${escapeHtml(site.name)} word solver preview">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${imageUrl}">
  <link rel="canonical" href="${canonicalUrl}">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/apple-touch-icon.svg">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="stylesheet" href="/assets/styles.css">
  <script async src="https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","${gaMeasurementId}",{anonymize_ip:true});</script>
  ${schemaJson ? `<script type="application/ld+json">${schemaJson}</script>` : ""}
</head>
<body>
  <header class="site-header">
    <a class="brand" href="/" aria-label="${site.name} home">
      <span class="brand-mark">WS</span>
      <span>${site.name}</span>
    </a>
    <nav class="top-nav" aria-label="Main navigation">
      <a href="/word-unscrambler/">Unscrambler</a>
      <a href="/word-finder/">Word Finder</a>
      <a href="/wordle-solver/">Wordle</a>
      <a href="/crossword-solver/">Crossword</a>
      <a href="/guides/">Guides</a>
      <a href="/tools/">All tools</a>
    </nav>
  </header>
  ${body}
  <footer class="site-footer">
    <p>${site.name} is an independent collection of word solving tools. Game names are used descriptively and do not imply affiliation.</p>
    <p><a href="/about/">About</a> · <a href="/how-it-works/">How it works</a> · <a href="/privacy/">Privacy</a> · <a href="/terms/">Terms</a> · <a href="/contact/">Contact</a> · <a href="/sitemap.xml">Sitemap</a></p>
  </footer>
  <script src="/assets/app.js" defer></script>
</body>
</html>`;
}

function toolPanel(page) {
  const mode = modeFor(page);
  const defaults = ownerDefaults(page);
  const title = page.title;
  const labels = {
    crossword: ["Clue pattern", "Use ? for unknown letters, like c?a??"],
    length: ["Letters or pattern", "Set the length first, then add letters, starts, ends, contains, or excludes"],
    boggle: ["Board letters", "Enter the board letters you can connect"],
    cryptogram: ["Known letters", "Enter solved letters or a pattern"],
    ladder: ["Start word", "Enter the word you want to change from"],
    spelling: ["Available letters", "Put the center letter first, then the rest"],
    wordle: ["Known letters", "Add green/yellow letters and exclusions"],
    scrabble: ["Rack letters", "Use ? for blank tiles"],
    anagram: ["Letters or phrase", "Enter the letters to rearrange"],
    letters: ["Letters", "Use ? for wildcards"],
  };
  const [mainLabel, mainHelp] = labels[mode] || labels.letters;
  const pageSpecificHelp = page.url === "/crossword-solver/"
    ? "Add a clue in the main box when meaning matters, or use Pattern for fixed letters and blanks."
    : page.url === "/missing-letters-solver/"
      ? "Use ? for every missing position, such as ??a?e or c?a??."
      : page.url === "/word-finder-by-length/"
        ? "Set Length first when the puzzle fixes the answer size, then add optional letter filters."
        : mainHelp;
  return `<section class="tool-panel" data-audit-exclude data-tool-mode="${mode}" data-page-keyword="${escapeHtml(page.keyword)}">
    <div class="tool-heading">
      <p class="eyebrow">${escapeHtml(clusterLabel(page))}</p>
      <h1>${escapeHtml(title)}</h1>
      <p>${escapeHtml(pageAction(page))} Use the controls below and get usable answers without leaving the page.</p>
    </div>
    <div class="solver-card">
      <label class="field">
        <span>${escapeHtml(mainLabel)}</span>
        <textarea data-role="letters" rows="3" placeholder="${mode === "wordle" ? "Try: crane" : mode === "crossword" ? "Try: c?a??" : mode === "ladder" ? "cold" : mode === "spelling" ? "aglnort" : "Try: tca?rs"}"></textarea>
      </label>
      <p class="field-help">${escapeHtml(pageSpecificHelp)} Not sure what to enter? Use the Sample button to load a realistic puzzle.</p>
      <div class="field-grid">
        <label class="field"><span>Contains</span><input data-role="contains" placeholder="ar"></label>
        <label class="field"><span>Starts with</span><input data-role="starts" placeholder="s"></label>
        <label class="field"><span>Ends with</span><input data-role="ends" placeholder="e"></label>
        <label class="field"><span>Length</span><input data-role="length" type="number" min="2" max="15" value="${defaults.length}" placeholder="${page.keyword.includes("5") ? "5" : ""}"></label>
        <label class="field"><span>Exclude</span><input data-role="exclude" placeholder="qz"></label>
        <label class="field"><span>Pattern</span><input data-role="pattern" placeholder="c?a??"></label>
      </div>
      <label class="check-field"><input data-role="exact" type="checkbox"${defaults.exact ? " checked" : ""}><span>Use every entered letter exactly once</span></label>
      <div class="button-row">
        <button class="primary-btn" data-action="solve">Solve</button>
        <button class="ghost-btn" data-action="sample">Sample</button>
        <button class="ghost-btn" data-action="copy-all">Copy all</button>
        <button class="ghost-btn" data-action="clear">Clear</button>
      </div>
      <div class="results" data-role="results" aria-live="polite">
        <p class="muted">Enter letters or a pattern, or click Sample to see how this tool narrows a real puzzle.</p>
      </div>
    </div>
  </section>`;
}

function adjacentLinks(page) {
  const guideLinks = guidesForTool(page)
    .map((guide) => `<a href="${guideUrl(guide)}">${escapeHtml(guide.title)}</a>`)
    .join("");
  const sameCluster = pages
    .filter((candidate) => candidate.cluster === page.cluster && candidate.url !== page.url && !inactivePageUrls.has(candidate.url))
    .sort((a, b) => b.volume - a.volume)
    .slice(0, 5)
    .map((candidate) => candidate.url);
  const authority = clusterLinks.filter((href) => href !== page.url && !sameCluster.includes(href));
  const links = [...sameCluster, ...authority]
    .slice(0, 8)
    .map((href) => {
      const target = pages.find((p) => p.url === href);
      return `<a href="${href}">${target ? escapeHtml(target.title) : href}</a>`;
    })
    .join("");
  const guideBlock = guideLinks
    ? `<h2>Related guides</h2><div class="link-grid">${guideLinks}</div>`
    : "";
  return `<section class="section-band" data-audit-exclude><div class="inner">${guideBlock}<h2>Related word tools</h2><div class="link-grid">${links}</div></div></section>`;
}

function pageHtml(page) {
  const draft = readDraft(page.rank, page.slug);
  const content = markdownToHtml(draft, page);
  const brandNote = page.brand_or_game_specific
    ? `<aside class="notice">This is an unofficial helper page. Brand and game names are used only to describe compatibility with the searcher's task.</aside>`
    : "";
  const inactiveNote = inactivePageUrls.has(page.url)
    ? `<aside class="notice"><strong>Product status:</strong> this page is not in the active search inventory because the current tool does not yet implement the full named puzzle workflow. Use the general solver while the specialized logic is being rebuilt.</aside>`
    : "";
  const trustNote = `<aside class="trust-note" data-audit-exclude aria-label="Page review and method">
      <p><strong>${escapeHtml(review.label)}.</strong> This independent tool runs in your browser and uses a built-in English word list; check official game dictionaries for scored play.</p>
    </aside>`;
  const body = `<main>
    ${toolPanel(page)}
    <section class="content-section"><div class="content-inner">${inactiveNote}${trustNote}${content}${brandNote}</div></section>
    ${adjacentLinks(page)}
  </main>`;
  return layout({
    title: `${page.title} - Free ${clusterLabel(page)}`,
    description: pageDescription(page),
    canonical: page.url,
    schemaJson: schema(page, draft),
    robots: inactivePageUrls.has(page.url) ? "noindex,follow" : "index,follow,max-image-preview:large",
    body,
  });
}

function homeHtml() {
  const featuredUrls = [
    "/word-unscrambler/",
    "/word-solver/",
    "/crossword-solver/",
    "/missing-letters-solver/",
    "/wordle-solver/",
    "/anagram-solver/",
    "/word-finder-by-length/",
    "/spelling-bee-solver/",
    "/scrabble-cheat/"
  ];
  const featured = featuredUrls.map((url) => pages.find((page) => page.url === url)).filter(Boolean).map((page) => `<a class="tool-link" href="${page.url}">
    <strong>${escapeHtml(page.title)}</strong>
    <span>${escapeHtml(pageAction(page))}</span>
  </a>`).join("");
  const clusters = [...new Set(pages.map((page) => page.cluster))].map((cluster) => {
    const count = pages.filter((page) => page.cluster === cluster).length;
    return `<li><strong>${escapeHtml(cluster.replaceAll("-", " "))}</strong><span>${count} tools</span></li>`;
  }).join("");
  const guideLinks = guideData.homepage_section.links.map((guide) => `<a class="tool-link" href="${escapeHtml(guide.url)}">
    <strong>${escapeHtml(guide.title)}</strong>
    <span>${escapeHtml(guide.description)}</span>
  </a>`).join("");
  const body = `<main>
    <section class="home-hero">
      <div class="home-copy">
        <p class="eyebrow">Letter-based word solving tools</p>
        <h1>Find the word that fits your letters, clue, or puzzle.</h1>
        <p>Start with a word unscrambler, then switch into Scrabble, Wordle, crossword, anagram, and letter-pattern tools when your puzzle needs more specific rules.</p>
        <div class="hero-actions">
          <a class="primary-link" href="/word-unscrambler/">Open Word Unscrambler</a>
          <a class="secondary-link" href="/tools/">Browse all tools</a>
        </div>
      </div>
      <img class="hero-asset" src="/assets/word-tiles.svg" alt="Letter tiles arranged into word solving patterns">
    </section>
    <section class="section-band"><div class="inner">
      <h2>Popular tools</h2>
      <div class="tool-grid">${featured}</div>
    </div></section>
    <section class="section-band alt" id="strategy-guides"><div class="inner">
      <h2>${escapeHtml(guideData.homepage_section.heading)}</h2>
      <p class="section-intro">${escapeHtml(guideData.homepage_section.intro)}</p>
      <div class="tool-grid">${guideLinks}</div>
    </div></section>
    <section class="section-band alt"><div class="inner">
      <h2>Coverage map</h2>
      <ul class="cluster-list">${clusters}</ul>
    </div></section>
  </main>`;
  const homeSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(),
      {
        "@type": "WebSite",
        "@id": `${site.origin}/#website`,
        name: site.name,
        url: `${site.origin}/`,
        description: site.description,
        publisher: { "@id": `${site.origin}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: `${site.origin}/word-solver/?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${site.origin}/#webpage`,
        url: `${site.origin}/`,
        name: site.name,
        description: site.description,
        isPartOf: { "@id": `${site.origin}/#website` },
      },
    ],
  });
  return layout({ title: `${site.name} - Word Unscrambler and Word Finder Tools`, description: site.description, body, schemaJson: homeSchema });
}

function toolsHtml() {
  const principalUrls = ["/word-unscrambler/", "/word-solver/", "/crossword-solver/", "/missing-letters-solver/", "/word-finder-by-length/", "/wordle-solver/", "/anagram-solver/", "/scrabble-word-finder/", "/spelling-bee-solver/", "/boggle-solver/", "/cryptogram-solver/"];
  const principalPages = principalUrls.map((url) => pages.find((page) => page.url === url)).filter(Boolean);
  const groups = [...new Set(activePages().map((page) => page.cluster))].map((cluster) => {
    const clusterPages = activePages()
      .filter((page) => page.cluster === cluster)
      .sort((a, b) => b.volume - a.volume);
    const label = clusterLabel(clusterPages[0]);
    const rows = clusterPages.map((page) => `<a class="tool-link" href="${page.url}">
      <strong>${escapeHtml(page.title)}</strong>
      <span>${escapeHtml(pageAction(page))}</span>
    </a>`).join("");
    return `<section class="tool-cluster" id="${escapeHtml(cluster)}">
      <div class="cluster-heading"><h2>${escapeHtml(label)}</h2><span>${clusterPages.length} tools</span></div>
      <div class="tool-grid">${rows}</div>
    </section>`;
  }).join("");
  const body = `<main><section class="page-heading"><div class="inner">
    <p class="eyebrow">All tools</p><h1>Word solver tools</h1><p>Browse tools by puzzle type, from general letter solving to Wordle, Scrabble, crossword, anagram, and spelling helpers.</p>
  </div></section><section class="section-band"><div class="inner"><section class="tool-cluster"><div class="cluster-heading"><h2>Principal solver pages</h2><span>${principalPages.length} owners</span></div><div class="tool-grid">${principalPages.map((page) => `<a class="tool-link" href="${page.url}"><strong>${escapeHtml(page.title)}</strong><span>${escapeHtml(pageAction(page))}</span></a>`).join("")}</div></section>${groups}</div></section></main>`;
  const toolsSchema = graphSchema([
    organizationSchema(),
    {
      "@type": "CollectionPage",
      "@id": `${site.origin}/tools/#collection`,
      name: `All Word Solver Tools - ${site.name}`,
      url: `${site.origin}/tools/`,
      description: "Browse all word unscrambler, word finder, anagram, crossword, and word game solver pages.",
      mainEntity: {
        "@type": "ItemList",
        itemListElement: activePages().map((page, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: page.title,
          url: absoluteUrl(page.url),
        })),
      },
    },
    {
      ...breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Tools", url: "/tools/" },
      ]),
      "@id": `${site.origin}/tools/#breadcrumb`,
    },
  ]);
  return layout({ title: `All Word Solver Tools - ${site.name}`, description: "Browse all word unscrambler, word finder, anagram, crossword, and word game solver pages.", canonical: "/tools/", body, schemaJson: toolsSchema });
}

function guidesHtml() {
  const groups = [
    {
      label: "Wordle and letter patterns",
      items: guideData.guides.filter((guide) => /wordle|vowels|5 letter/i.test(`${guide.title} ${guide.description}`)),
    },
    {
      label: "Scrabble and word games",
      items: guideData.guides.filter((guide) => /scrabble|boggle|spelling bee|pangram/i.test(`${guide.title} ${guide.description}`)),
    },
    {
      label: "Anagrams and crosswords",
      items: guideData.guides.filter((guide) => /anagram|crossword|unscramble|cryptogram/i.test(`${guide.title} ${guide.description}`)),
    },
  ];
  const seen = new Set();
  const sections = groups.map((group) => {
    const items = group.items.filter((guide) => {
      if (seen.has(guide.slug)) return false;
      seen.add(guide.slug);
      return true;
    });
    if (!items.length) return "";
    const links = items.map((guide) => `<a class="tool-link" href="${guideUrl(guide)}">
      <strong>${escapeHtml(guide.title)}</strong>
      <span>${escapeHtml(guide.description)}</span>
    </a>`).join("");
    return `<section class="tool-cluster"><div class="cluster-heading"><h2>${escapeHtml(group.label)}</h2><span>${items.length} guides</span></div><div class="tool-grid">${links}</div></section>`;
  }).join("");
  const remaining = guideData.guides.filter((guide) => !seen.has(guide.slug));
  const remainingSection = remaining.length
    ? `<section class="tool-cluster"><div class="cluster-heading"><h2>More word puzzle guides</h2><span>${remaining.length} guides</span></div><div class="tool-grid">${remaining.map((guide) => `<a class="tool-link" href="${guideUrl(guide)}"><strong>${escapeHtml(guide.title)}</strong><span>${escapeHtml(guide.description)}</span></a>`).join("")}</div></section>`
    : "";
  const body = `<main><section class="page-heading"><div class="inner">
    <p class="eyebrow">Strategy guides</p>
    <h1>Word puzzle guides for letters, clues, racks, and patterns.</h1>
    <p>Use these guides when a tool gives candidates but you still need to choose the right word, understand a rule, or read a puzzle clue more carefully.</p>
  </div></section><section class="section-band"><div class="inner">${sections}${remainingSection}</div></section></main>`;
  const guidesSchema = graphSchema([
    organizationSchema(),
    {
      "@type": "CollectionPage",
      "@id": `${site.origin}/guides/#collection`,
      name: `Word Puzzle Guides - ${site.name}`,
      url: `${site.origin}/guides/`,
      description: "Strategy guides for word games, word finding, anagrams, crosswords, Scrabble-style racks, Wordle-style clues, and spelling puzzles.",
      mainEntity: {
        "@type": "ItemList",
        itemListElement: guideData.guides.map((guide, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: guide.title,
          url: absoluteUrl(guideUrl(guide)),
        })),
      },
    },
    {
      ...breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Guides", url: "/guides/" },
      ]),
      "@id": `${site.origin}/guides/#breadcrumb`,
    },
  ]);
  return layout({ title: `Word Puzzle Guides - ${site.name}`, description: "Browse word puzzle guides for Wordle, Scrabble-style racks, anagrams, crosswords, spelling puzzles, no-vowel words, and letter patterns.", canonical: "/guides/", body, schemaJson: guidesSchema });
}

function staticPageSchema(page) {
  return graphSchema([
    organizationSchema(),
    {
      "@type": "WebPage",
      "@id": `${absoluteUrl(page.url)}#webpage`,
      url: absoluteUrl(page.url),
      name: page.title,
      description: page.description,
      isPartOf: { "@id": `${site.origin}/#website` },
      breadcrumb: { "@id": `${absoluteUrl(page.url)}#breadcrumb` },
      dateModified: review.date,
    },
    {
      ...breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: page.h1, url: page.url },
      ]),
      "@id": `${absoluteUrl(page.url)}#breadcrumb`,
    },
  ]);
}

function staticPageHtml(page) {
  const bodyContent = blocksToHtml(page.body);
  const body = `<main>
    <section class="page-heading"><div class="inner">
      <p class="eyebrow">${escapeHtml(page.eyebrow)}</p>
      <h1>${escapeHtml(page.h1)}</h1>
      <p>${escapeHtml(page.description)}</p>
    </div></section>
    <section class="content-section"><div class="content-inner">${bodyContent}</div></section>
  </main>`;
  return layout({
    title: `${page.title} - ${site.name}`,
    description: page.description,
    canonical: page.url,
    schemaJson: staticPageSchema(page),
    body,
  });
}

function guidePageSchema(guide) {
  const url = guideUrl(guide);
  const modified = guide.date_modified || review.date;
  return graphSchema([
    organizationSchema(),
    {
      "@type": "Article",
      "@id": `${absoluteUrl(url)}#article`,
      headline: guide.title,
      description: guide.description,
      url: absoluteUrl(url),
      dateModified: modified,
      author: {
        "@type": "Person",
        name: review.authorName,
      },
      publisher: { "@id": `${site.origin}/#organization` },
      isPartOf: { "@id": `${site.origin}/#website` },
      citation: Array.isArray(guide.sources) ? guide.sources.map((source) => source.url) : undefined,
    },
    {
      "@type": "WebPage",
      "@id": `${absoluteUrl(url)}#webpage`,
      url: absoluteUrl(url),
      name: guide.title,
      description: guide.description,
      mainEntity: { "@id": `${absoluteUrl(url)}#article` },
      breadcrumb: { "@id": `${absoluteUrl(url)}#breadcrumb` },
      dateModified: modified,
    },
    {
      ...breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Guides", url: "/guides/" },
        { name: guide.title, url },
      ]),
      "@id": `${absoluteUrl(url)}#breadcrumb`,
    },
  ]);
}

function guidePageHtml(guide) {
  const bodyContent = blocksToHtml(guide.body);
  const parentTools = Array.isArray(guide.parent_tools)
    ? guide.parent_tools
        .filter((href) => !inactivePageUrls.has(href))
        .map((href) => {
          const target = pages.find((page) => page.url === href);
          return `<a href="${href}">${target ? escapeHtml(target.title) : escapeHtml(href)}</a>`;
        })
        .join("")
    : "";
  const relatedTools = parentTools
    ? `<section class="section-band" data-audit-exclude><div class="inner"><h2>Related tools</h2><div class="link-grid">${parentTools}</div></div></section>`
    : "";
  const body = `<main>
    <section class="page-heading"><div class="inner">
      <p class="eyebrow">${escapeHtml(guide.eyebrow || "Strategy guide")}</p>
      <h1>${escapeHtml(guide.h1)}</h1>
      <p>${escapeHtml(guide.description)}</p>
    </div></section>
    <section class="content-section"><div class="content-inner">${bodyContent}${sourcesHtml(guide.sources)}</div></section>
    ${relatedTools}
  </main>`;
  return layout({
    title: `${guide.title} - ${site.name}`,
    description: guide.description,
    canonical: guideUrl(guide),
    schemaJson: guidePageSchema(guide),
    body,
  });
}

function notFoundHtml() {
  const body = `<main>
    <section class="page-heading"><div class="inner">
      <p class="eyebrow">404</p>
      <h1>Page not found</h1>
      <p>The page may have moved, or the URL may have a typo. Start with the main word solver tools below.</p>
      <div class="hero-actions">
        <a class="primary-link" href="/word-unscrambler/">Open Word Unscrambler</a>
        <a class="secondary-link" href="/tools/">Browse all tools</a>
      </div>
    </div></section>
    <section class="section-band"><div class="inner">
      <h2>Popular tools</h2>
      <div class="link-grid">
        <a href="/word-finder/">Word Finder</a>
        <a href="/wordle-solver/">Wordle Solver</a>
        <a href="/crossword-solver/">Crossword Solver</a>
        <a href="/anagram-solver/">Anagram Solver</a>
      </div>
    </div></section>
  </main>`;
  return layout({
    title: `Page Not Found - ${site.name}`,
    description: "Find the right word solver tool after a missing page or mistyped URL.",
    canonical: "/404.html",
    schemaJson: graphSchema([organizationSchema()]),
    robots: "noindex,follow",
    body,
  });
}

function writeStaticAssets() {
  ensureDir(path.join(publicDir, "assets"));
  const css = `:root{--ink:#17202a;--muted:#5c6975;--line:#d7dde2;--paper:#fbfcf8;--panel:#ffffff;--accent:#0f766e;--accent-2:#b45309;--blue:#1d4ed8;--soft:#eef7f5;--shadow:0 18px 60px rgba(23,32,42,.10)}*{box-sizing:border-box}body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--ink);background:var(--paper);line-height:1.55}a{color:inherit}.site-header{position:sticky;top:0;z-index:10;display:flex;justify-content:space-between;align-items:center;gap:24px;padding:14px clamp(16px,4vw,48px);background:rgba(251,252,248,.94);border-bottom:1px solid var(--line);backdrop-filter:blur(14px)}.brand{display:flex;align-items:center;gap:10px;font-weight:800;text-decoration:none}.brand-mark{display:grid;place-items:center;width:38px;height:38px;border-radius:8px;background:var(--ink);color:white;letter-spacing:.02em}.top-nav{display:flex;gap:18px;flex-wrap:wrap}.top-nav a{text-decoration:none;color:var(--muted);font-weight:650;font-size:14px}.top-nav a:hover{color:var(--ink)}.home-hero{min-height:560px;display:grid;grid-template-columns:minmax(0,1fr) minmax(280px,520px);align-items:center;gap:40px;padding:64px clamp(18px,6vw,80px) 44px;background:linear-gradient(180deg,#f7fbf7 0%,#fbfcf8 100%)}.home-copy h1{font-size:clamp(42px,6vw,76px);line-height:1.02;margin:0 0 18px;letter-spacing:0}.home-copy p{font-size:18px;max-width:680px;color:var(--muted)}.eyebrow{text-transform:uppercase;letter-spacing:.08em;font-size:12px;font-weight:800;color:var(--accent)}.hero-actions,.button-row{display:flex;gap:12px;flex-wrap:wrap;margin-top:24px}.primary-link,.secondary-link,.primary-btn,.ghost-btn{border:0;border-radius:8px;padding:12px 16px;font-weight:800;text-decoration:none;cursor:pointer}.primary-link,.primary-btn{background:var(--accent);color:white}.secondary-link,.ghost-btn{background:white;color:var(--ink);border:1px solid var(--line)}.hero-asset{width:100%;max-width:520px;justify-self:center}.tool-panel{display:grid;grid-template-columns:minmax(260px,.8fr) minmax(320px,1.2fr);gap:28px;padding:44px clamp(18px,5vw,72px);background:#f3faf7;border-bottom:1px solid var(--line)}.tool-heading h1{font-size:clamp(34px,4.6vw,58px);line-height:1.05;margin:0 0 14px}.tool-heading p{color:var(--muted);font-size:17px}.solver-card{background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:20px;box-shadow:var(--shadow)}.field{display:grid;gap:6px;font-weight:750;color:var(--ink)}.field span{font-size:13px}.field-help{margin:8px 0 0;color:var(--muted);font-size:13px}.field textarea,.field input{width:100%;border:1px solid var(--line);border-radius:8px;padding:12px;font:inherit;background:#fff}.field textarea:focus,.field input:focus{outline:3px solid rgba(15,118,110,.18);border-color:var(--accent)}.field-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:14px}.check-field{display:flex;align-items:center;gap:10px;margin-top:14px;padding:10px 12px;border:1px solid var(--line);border-radius:8px;background:#fbfcf8;font-weight:750}.check-field input{width:18px;height:18px;accent-color:var(--accent)}.results{margin-top:18px;border-top:1px solid var(--line);padding-top:16px;min-height:88px}.result-toolbar{display:flex;justify-content:space-between;gap:12px;align-items:center;margin-bottom:12px}.result-group{margin-top:14px}.result-group h3{font-size:15px;margin:0 0 8px;color:var(--muted)}.result-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(108px,1fr));gap:8px}.word-pill{display:grid;gap:2px;border:1px solid var(--line);border-radius:8px;background:#fbfcff;padding:9px 10px;font-weight:800;text-align:center;cursor:pointer}.word-pill small{font-size:11px;color:var(--muted);font-weight:700}.muted{color:var(--muted)}.content-section{padding:42px clamp(18px,5vw,72px);background:var(--paper)}.content-inner{max-width:920px}.content-inner h2{margin-top:34px;font-size:28px}.content-inner h3{margin-top:24px;font-size:20px}.content-inner p,.content-inner li{color:#2f3b45}.trust-note{border:1px solid var(--line);background:#fff;border-radius:8px;padding:16px 18px;margin:0 0 30px;box-shadow:0 10px 30px rgba(23,32,42,.05)}.trust-note p{margin:0 0 8px}.trust-note p:last-child{margin-bottom:0}.sources-note{margin-top:34px;padding:16px 18px;border:1px solid var(--line);border-radius:8px;background:#fff}.sources-note h2{font-size:20px;margin:0 0 10px}.sources-note ul{margin:0 0 10px;padding-left:20px}.sources-note p{margin:0;color:var(--muted);font-size:14px}.notice{border-left:4px solid var(--accent-2);background:#fff7ed;padding:14px 16px;border-radius:8px;margin-top:28px}.section-band{padding:42px clamp(18px,5vw,72px);border-top:1px solid var(--line);background:white}.section-band.alt{background:#f7f8fb}.inner{max-width:1180px;margin:0 auto}.tool-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:14px}.tool-cluster{margin:0 0 38px}.tool-cluster:last-child{margin-bottom:0}.cluster-heading{display:flex;justify-content:space-between;align-items:end;gap:16px;margin-bottom:12px}.cluster-heading h2{margin:0;font-size:26px}.cluster-heading span{color:var(--muted);font-weight:800}.tool-link{display:grid;gap:7px;text-decoration:none;background:white;border:1px solid var(--line);border-radius:8px;padding:16px;min-height:118px}.tool-link:hover{border-color:var(--accent);box-shadow:0 10px 26px rgba(15,118,110,.09)}.tool-link span{color:var(--muted);font-size:14px}.link-grid{display:flex;gap:10px;flex-wrap:wrap}.link-grid a{padding:10px 12px;border:1px solid var(--line);border-radius:8px;text-decoration:none;background:white}.cluster-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px;padding:0;list-style:none}.cluster-list li{display:flex;justify-content:space-between;gap:10px;border:1px solid var(--line);border-radius:8px;padding:14px;background:white}.page-heading{padding:44px clamp(18px,5vw,72px);background:#f3faf7}.site-footer{padding:34px clamp(18px,5vw,72px);background:var(--ink);color:#dfe7ee}.site-footer a{color:white}@media(max-width:820px){.site-header{align-items:flex-start;flex-direction:column}.top-nav{gap:12px}.home-hero,.tool-panel{grid-template-columns:1fr}.home-hero{padding-top:40px}.field-grid{grid-template-columns:1fr}.hero-asset{max-width:330px}.tool-heading h1{font-size:36px}.result-toolbar,.cluster-heading{align-items:flex-start;flex-direction:column}}`;
  fs.writeFileSync(path.join(publicDir, "assets/styles.css"), css);
  const app = `const WORDS=${JSON.stringify([...new Set(dictionary.map((word) => word.toLowerCase()))])};
const SCORE={a:1,b:3,c:3,d:2,e:1,f:4,g:2,h:4,i:1,j:8,k:5,l:1,m:3,n:1,o:1,p:3,q:10,r:1,s:1,t:1,u:1,v:4,w:4,x:8,y:4,z:10};
function normalize(value){return (value||"").toLowerCase().replace(/[^a-z?]/g,"");}
function letterCounts(value){const counts={};for(const c of normalize(value)){counts[c]=(counts[c]||0)+1;}return counts;}
function canBuild(word,letters){const pool=normalize(letters).split("");let blanks=pool.filter(c=>c==="?").length;const counts={};for(const c of pool){if(c!=="?")counts[c]=(counts[c]||0)+1;}for(const c of word){if(counts[c])counts[c]--;else if(blanks)blanks--;else return false;}return true;}
function usesEveryLetter(word,letters){const clean=normalize(letters).replace(/\\?/g,"");if(!clean||word.length!==normalize(letters).length)return false;const a=letterCounts(word);const b=letterCounts(clean);return Object.keys(a).every(k=>a[k]===b[k])&&Object.keys(b).every(k=>a[k]===b[k]);}
function bogglePathExists(word,letters){const clean=normalize(letters).replace(/\\?/g,"");const size=Math.sqrt(clean.length);if(!Number.isInteger(size)||![4,5].includes(size))return false;const used=Array(clean.length).fill(false);function dfs(i,pos){if(pos===word.length)return true;if(i<0||i>=clean.length||used[i]||clean[i]!==word[pos])return false;used[i]=true;const r=Math.floor(i/size),c=i%size;for(let dr=-1;dr<=1;dr++)for(let dc=-1;dc<=1;dc++){if(dr||dc){const nr=r+dr,nc=c+dc;if(nr>=0&&nr<size&&nc>=0&&nc<size&&dfs(nr*size+nc,pos+1)){used[i]=false;return true;}}}used[i]=false;return false;}for(let i=0;i<clean.length;i++)if(dfs(i,0))return true;return false;}
function score(word){return word.split("").reduce((sum,c)=>sum+(SCORE[c]||0),0)}
function matchPattern(word,pattern){const p=normalize(pattern);if(!p)return true;if(word.length!==p.length)return false;return [...p].every((c,i)=>c==="?"||c===word[i]);}
function details(word,mode,letters){if(mode==="scrabble")return score(word)+" base pts";if(mode==="spelling"){const unique=new Set(letters.split("").filter(Boolean));const pangram=unique.size&&[...unique].every(c=>word.includes(c));return pangram?"pangram":"uses center";}if(mode==="boggle"&&bogglePathExists(word,letters))return "path found";if(mode==="wordle")return "5 letters";return word.length+" letters";}
function renderResults(card,candidates,mode,letters){const out=card.querySelector('[data-role="results"]');if(!candidates.length){out.innerHTML='<p class="muted">No matches yet. Remove one filter, check the pattern length, or use ? for an unknown letter.</p>';return;}const groups=new Map();for(const word of candidates){const key=word.length+" letters";if(!groups.has(key))groups.set(key,[]);groups.get(key).push(word);}let html='<div class="result-toolbar"><strong>'+candidates.length+' matches</strong><span class="muted">Grouped by word length. Tap a word to copy it.</span></div>';for(const [label,words] of groups){html+='<section class="result-group"><h3>'+label+'</h3><div class="result-list">'+words.map(w=>'<button class="word-pill" type="button" data-copy="'+w+'"><span>'+w+'</span><small>'+details(w,mode,letters)+'</small></button>').join("")+'</div></section>';}out.innerHTML=html;}
function solve(card){const mode=card.closest("[data-tool-mode]")?.dataset.toolMode||card.dataset.toolMode||"letters";const rawLetters=card.querySelector('[data-role="letters"]').value;const letters=normalize(rawLetters);const contains=normalize(card.querySelector('[data-role="contains"]').value);const starts=normalize(card.querySelector('[data-role="starts"]').value);const ends=normalize(card.querySelector('[data-role="ends"]').value);const exclude=normalize(card.querySelector('[data-role="exclude"]').value);const exact=card.querySelector('[data-role="exact"]')?.checked||false;let len=Number(card.querySelector('[data-role="length"]').value||0);let pattern=card.querySelector('[data-role="pattern"]').value;if(exact&&letters&&!len)len=letters.length;if(mode==="wordle"&&!len)len=5;if((mode==="crossword"||mode==="wordle"||mode==="cryptogram")&&letters.includes("?")&&!pattern)pattern=letters;let candidates=WORDS.filter(w=>!len||w.length===len).filter(w=>!starts||w.startsWith(starts)).filter(w=>!ends||w.endsWith(ends)).filter(w=>!contains||contains.split("").every(c=>w.includes(c))).filter(w=>!exclude||!exclude.split("").some(c=>w.includes(c))).filter(w=>matchPattern(w,pattern));if(mode==="spelling"&&letters){const center=letters[0];const allowed=new Set(letters.split(""));candidates=candidates.filter(w=>w.length>=4&&w.includes(center)&&[...w].every(c=>allowed.has(c)));}else if(mode==="boggle"&&letters.replace(/\\?/g,"").length>=16){candidates=candidates.filter(w=>bogglePathExists(w,letters));}else if(exact&&letters&&!letters.includes("?")){candidates=candidates.filter(w=>usesEveryLetter(w,letters));}else if(letters&&!(mode==="crossword"&&letters.includes("?"))&&!(mode==="wordle"&&letters.includes("?"))){candidates=candidates.filter(w=>canBuild(w,letters)||w.includes(letters));}candidates=[...new Set(candidates)].sort((a,b)=>b.length-a.length||score(b)-score(a)||a.localeCompare(b)).slice(0,160);renderResults(card,candidates,mode,letters);}
function sample(card){const mode=card.closest("[data-tool-mode]")?.dataset.toolMode||card.dataset.toolMode;const letters=card.querySelector('[data-role="letters"]');const length=card.querySelector('[data-role="length"]');const pattern=card.querySelector('[data-role="pattern"]');card.querySelectorAll("input,textarea").forEach(i=>i.value="");if(mode==="wordle"){letters.value="crane";length.value=5;card.querySelector('[data-role="exclude"]').value="tou";}else if(mode==="crossword"){letters.value="";pattern.value="c?a??";}else if(mode==="length"){letters.value="ar";length.value=5;card.querySelector('[data-role="contains"]').value="a";}else if(mode==="spelling"){letters.value="aglnort";}else if(mode==="ladder"){letters.value="cold";card.querySelector('[data-role="contains"]').value="warm";length.value=4;}else if(mode==="boggle"){letters.value="abcdefghijklmnop";length.value=4;}else{letters.value="tca?rs";length.value="";}solve(card);}
document.addEventListener("click",async e=>{const btn=e.target.closest("button");if(!btn)return;const card=btn.closest(".solver-card");if(btn.dataset.action==="solve")solve(card);if(btn.dataset.action==="sample")sample(card);if(btn.dataset.action==="copy-all"){const words=[...card.querySelectorAll("[data-copy]")].map(b=>b.dataset.copy);if(words.length){await navigator.clipboard?.writeText(words.join("\\n"));btn.textContent="Copied all";setTimeout(()=>btn.textContent="Copy all",900);}}if(btn.dataset.action==="clear"){card.querySelectorAll("input,textarea").forEach(i=>i.value="");card.querySelector('[data-role="results"]').innerHTML='<p class="muted">Enter letters or a pattern to see matching words.</p>';}if(btn.dataset.copy){await navigator.clipboard?.writeText(btn.dataset.copy);const old=btn.innerHTML;btn.textContent="Copied";setTimeout(()=>btn.innerHTML=old,900);}});
document.addEventListener("input",e=>{const card=e.target.closest(".solver-card");if(card&&e.target.matches("input,textarea"))solve(card);});`;
  fs.writeFileSync(path.join(publicDir, "assets/app.js"), app);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 430" role="img" aria-label="Word solver letter tiles"><rect width="620" height="430" rx="28" fill="#eef7f5"/><g font-family="Inter, Arial, sans-serif" font-weight="800" font-size="54" text-anchor="middle"><rect x="70" y="80" width="92" height="92" rx="14" fill="#fff" stroke="#17202a"/><text x="116" y="144" fill="#17202a">W</text><rect x="178" y="80" width="92" height="92" rx="14" fill="#fff" stroke="#17202a"/><text x="224" y="144" fill="#17202a">O</text><rect x="286" y="80" width="92" height="92" rx="14" fill="#fff" stroke="#17202a"/><text x="332" y="144" fill="#17202a">R</text><rect x="394" y="80" width="92" height="92" rx="14" fill="#fff" stroke="#17202a"/><text x="440" y="144" fill="#17202a">D</text><rect x="124" y="206" width="92" height="92" rx="14" fill="#0f766e"/><text x="170" y="270" fill="#fff">F</text><rect x="232" y="206" width="92" height="92" rx="14" fill="#0f766e"/><text x="278" y="270" fill="#fff">I</text><rect x="340" y="206" width="92" height="92" rx="14" fill="#0f766e"/><text x="386" y="270" fill="#fff">N</text><rect x="448" y="206" width="92" height="92" rx="14" fill="#0f766e"/><text x="494" y="270" fill="#fff">D</text></g><path d="M92 342h436" stroke="#17202a" stroke-width="8" stroke-linecap="round"/><path d="M460 322l66 20-66 20" fill="none" stroke="#17202a" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  fs.writeFileSync(path.join(publicDir, "assets/word-tiles.svg"), svg);
  const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#17202a"/><text x="32" y="41" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="800" fill="#fff">WS</text></svg>`;
  fs.writeFileSync(path.join(publicDir, "favicon.svg"), favicon);
  fs.writeFileSync(path.join(publicDir, "apple-touch-icon.svg"), favicon);
  const social = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#fbfcf8"/><rect x="72" y="72" width="1056" height="486" rx="34" fill="#eef7f5" stroke="#d7dde2" stroke-width="4"/><text x="116" y="176" font-family="Arial, sans-serif" font-size="42" font-weight="800" fill="#0f766e">Word Solver Tools</text><text x="116" y="280" font-family="Arial, sans-serif" font-size="78" font-weight="800" fill="#17202a">Unscramble letters.</text><text x="116" y="370" font-family="Arial, sans-serif" font-size="78" font-weight="800" fill="#17202a">Find better words.</text><g font-family="Arial, sans-serif" font-size="54" font-weight="800" text-anchor="middle"><rect x="758" y="154" width="92" height="92" rx="14" fill="#fff" stroke="#17202a" stroke-width="3"/><text x="804" y="217" fill="#17202a">W</text><rect x="866" y="154" width="92" height="92" rx="14" fill="#fff" stroke="#17202a" stroke-width="3"/><text x="912" y="217" fill="#17202a">O</text><rect x="974" y="154" width="92" height="92" rx="14" fill="#fff" stroke="#17202a" stroke-width="3"/><text x="1020" y="217" fill="#17202a">R</text><rect x="812" y="280" width="92" height="92" rx="14" fill="#0f766e"/><text x="858" y="343" fill="#fff">F</text><rect x="920" y="280" width="92" height="92" rx="14" fill="#0f766e"/><text x="966" y="343" fill="#fff">I</text><rect x="1028" y="280" width="92" height="92" rx="14" fill="#0f766e"/><text x="1074" y="343" fill="#fff">N</text></g><text x="116" y="470" font-family="Arial, sans-serif" font-size="32" fill="#5c6975">Word unscrambler, Wordle, Scrabble, crossword, anagram, and pattern tools.</text></svg>`;
  fs.writeFileSync(path.join(publicDir, "assets/social-card.svg"), social);
  fs.writeFileSync(path.join(publicDir, "site.webmanifest"), JSON.stringify({
    name: site.name,
    short_name: "Word Solver",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fbfcf8",
    theme_color: site.themeColor,
    icons: [
      { src: "/favicon.svg", sizes: "64x64", type: "image/svg+xml" },
      { src: "/apple-touch-icon.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
  }, null, 2));
}

function writePage(page) {
  const dir = path.join(publicDir, page.slug);
  ensureDir(dir);
  fs.writeFileSync(path.join(dir, "index.html"), pageHtml(page));
}

function writeSitemap() {
  const urls = allSitemapUrls();
  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${site.origin}${url}</loc><lastmod>${sitemapLastmodFor(url)}</lastmod></url>`).join("\n")}\n</urlset>\n`);
  fs.writeFileSync(path.join(publicDir, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${site.origin}/sitemap.xml\n`);
  fs.writeFileSync(path.join(publicDir, "_headers"), `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n/*.svg\n  Cache-Control: public, max-age=31536000, immutable\n/*.webmanifest\n  Cache-Control: public, max-age=86400\n/*.html\n  Cache-Control: public, max-age=0, must-revalidate\n`);
  if (site.origin === "https://wordsolvertools.org") {
    fs.writeFileSync(path.join(publicDir, "_redirects"), `${[...retiredRedirects].map(([from, to]) => `${from} ${to} 301`).join("\n")}
https://www.wordsolvertools.org/* https://wordsolvertools.org/:splat 301
`);
  }
  fs.writeFileSync(path.join(publicDir, "_worker.js"), `export default {
  fetch(request, env) {
    const url = new URL(request.url);
    let redirect = false;
    if (url.hostname === "www.wordsolvertools.org") {
      url.hostname = "wordsolvertools.org";
      redirect = true;
    }
    const redirects = ${JSON.stringify(Object.fromEntries(retiredRedirects))};
    if (redirects[url.pathname]) {
      url.pathname = redirects[url.pathname];
      redirect = true;
    }
    if (redirect) return Response.redirect(url.toString(), 301);
    return env.ASSETS.fetch(request);
  }
};
`);
}

function writeLlmsTxt() {
  const guideLines = guideData.guides.map((guide) => `- [${guide.title}](${site.origin}${guideUrl(guide)}): ${guide.description}`);
  const toolLines = pages
    .filter((page) => clusterLinks.includes(page.url))
    .map((page) => `- [${page.title}](${site.origin}${page.url}): ${page.description}`);
  fs.writeFileSync(path.join(publicDir, "llms.txt"), `# WordSolverTools.org

> Browser-based word solver tools and practical guides for word games, anagrams, crosswords, spelling puzzles, and letter searches.

Word Solver Tools provides independent candidate lists from a built-in English word list. The tools run in the browser and are not official dictionaries for Scrabble, Wordle, The New York Times, Words With Friends, Boggle, or any other named game or publisher. Treat results as candidates and confirm important plays against the rule set or word list you are using.

## Core Tools

${toolLines.join("\n")}

## Strategy Guides

${guideLines.join("\n")}

## Method and limits

- [How Word Solver Tools Works](${site.origin}/how-it-works/): Explains browser-side filtering, sorting, and word-list limits.
- [About Word Solver Tools](${site.origin}/about/): Explains independence and scope.
- [Sitemap](${site.origin}/sitemap.xml)
`);
}

fs.rmSync(publicDir, { recursive: true, force: true });
ensureDir(publicDir);
writeStaticAssets();
fs.writeFileSync(path.join(publicDir, "index.html"), homeHtml());
ensureDir(path.join(publicDir, "tools"));
fs.writeFileSync(path.join(publicDir, "tools/index.html"), toolsHtml());
ensureDir(path.join(publicDir, "guides"));
fs.writeFileSync(path.join(publicDir, "guides/index.html"), guidesHtml());
for (const guide of guideData.guides) {
  const guideDir = path.join(publicDir, guide.slug);
  ensureDir(guideDir);
  fs.writeFileSync(path.join(guideDir, "index.html"), guidePageHtml(guide));
}
for (const page of staticPages) {
  ensureDir(path.join(publicDir, page.slug));
  fs.writeFileSync(path.join(publicDir, page.slug, "index.html"), staticPageHtml(page));
}
for (const page of pages) writePage(page);
fs.writeFileSync(path.join(publicDir, "404.html"), notFoundHtml());
writeSitemap();
writeLlmsTxt();

console.log(`Built ${pages.length + guideData.guides.length + staticPages.length + 3} pages into ${publicDir}`);
