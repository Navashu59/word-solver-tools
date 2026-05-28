const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");
const pages = JSON.parse(fs.readFileSync(path.join(root, "planning/page-map.json"), "utf8")).pages;

const site = {
  name: "Word Solver Tools",
  origin: process.env.SITE_ORIGIN || "https://example.com",
  description: "Fast word unscrambler, word finder, anagram, crossword, and word game solver tools.",
  themeColor: "#0f766e",
  socialImage: "/assets/social-card.svg",
};

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
  "/scrabble-word-finder/","/wordle-solver/","/crossword-solver/","/5-letter-word-finder/"
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

function pageAction(page) {
  const mode = modeFor(page);
  const byMode = {
    crossword: `Solve ${page.title.toLowerCase()} clues with known letters, blank spots, and length filters.`,
    boggle: `Find playable words from your Boggle board letters and narrow the list by length or required letters.`,
    cryptogram: `Work through cryptogram patterns with known letters, unknown positions, and quick candidate words.`,
    ladder: `Find word ladder steps by matching length, letters, and possible word changes.`,
    spelling: `Find Spelling Bee words from your seven letters, including the required center letter.`,
    wordle: `Find Wordle guesses from known letters, excluded letters, and five-letter patterns.`,
    scrabble: `Find high-value Scrabble and word-game plays from your rack letters, blanks, and board constraints.`,
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
  return `${page.title}: ${base} Free, fast, and built for ${keyword} searches.`;
}

function normalizeContentCopy(text, page) {
  return text
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
      html += `<h2>${escapeHtml(line.slice(3))}</h2>`;
      continue;
    }
    if (line.startsWith("### ")) {
      closeList();
      html += `<h3>${escapeHtml(line.slice(4))}</h3>`;
      continue;
    }
    if (/^\d+\.\s/.test(line)) {
      closeList();
      html += `<p>${escapeHtml(line.replace(/^\d+\.\s/, ""))}</p>`;
      continue;
    }
    if (line.startsWith("- ")) {
      if (!listOpen) {
        html += "<ul>";
        listOpen = true;
      }
      html += `<li>${escapeHtml(line.slice(2))}</li>`;
      continue;
    }
    closeList();
    html += `<p>${escapeHtml(line)}</p>`;
  }
  closeList();
  return html;
}

function modeFor(page) {
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

function schema(page) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: page.title,
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    url: `${site.origin}${page.url}`,
    description: pageDescription(page),
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  });
}

function layout({ title, description, body, canonical = "/", image = site.socialImage, schemaJson = "" }) {
  const canonicalUrl = `${site.origin}${canonical}`;
  const imageUrl = image.startsWith("http") ? image : `${site.origin}${image}`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="robots" content="index,follow,max-image-preview:large">
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
      <a href="/tools/">All tools</a>
    </nav>
  </header>
  ${body}
  <footer class="site-footer">
    <p>${site.name} is an independent collection of word solving tools. Game names are used descriptively and do not imply affiliation.</p>
    <p><a href="/sitemap.xml">Sitemap</a></p>
  </footer>
  <script src="/assets/app.js" defer></script>
</body>
</html>`;
}

function toolPanel(page) {
  const mode = modeFor(page);
  const title = page.title;
  const labels = {
    crossword: ["Clue pattern", "Use ? for unknown letters, like c?a??"],
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
  return `<section class="tool-panel" data-tool-mode="${mode}" data-page-keyword="${escapeHtml(page.keyword)}">
    <div class="tool-heading">
      <p class="eyebrow">${escapeHtml(page.cluster.replaceAll("-", " "))}</p>
      <h1>${escapeHtml(title)}</h1>
      <p>${escapeHtml(pageAction(page))} Use the controls below and get usable answers without leaving the page.</p>
    </div>
    <div class="solver-card">
      <label class="field">
        <span>${escapeHtml(mainLabel)}</span>
        <textarea data-role="letters" rows="3" placeholder="${mode === "wordle" ? "Try: crane" : mode === "crossword" ? "Try: c?a??" : mode === "ladder" ? "cold" : mode === "spelling" ? "aglnort" : "Try: tca?rs"}"></textarea>
      </label>
      <p class="field-help">${escapeHtml(mainHelp)}</p>
      <div class="field-grid">
        <label class="field"><span>Contains</span><input data-role="contains" placeholder="ar"></label>
        <label class="field"><span>Starts with</span><input data-role="starts" placeholder="s"></label>
        <label class="field"><span>Ends with</span><input data-role="ends" placeholder="e"></label>
        <label class="field"><span>Length</span><input data-role="length" type="number" min="2" max="15" placeholder="${page.keyword.includes("5") ? "5" : ""}"></label>
        <label class="field"><span>Exclude</span><input data-role="exclude" placeholder="qz"></label>
        <label class="field"><span>Pattern</span><input data-role="pattern" placeholder="c?a??"></label>
      </div>
      <div class="button-row">
        <button class="primary-btn" data-action="solve">Solve</button>
        <button class="ghost-btn" data-action="sample">Sample</button>
        <button class="ghost-btn" data-action="clear">Clear</button>
      </div>
      <div class="results" data-role="results" aria-live="polite">
        <p class="muted">Enter letters or a pattern to see matching words.</p>
      </div>
    </div>
  </section>`;
}

function adjacentLinks(page) {
  const links = clusterLinks
    .filter((href) => href !== page.url)
    .slice(0, 6)
    .map((href) => {
      const target = pages.find((p) => p.url === href);
      return `<a href="${href}">${target ? escapeHtml(target.title) : href}</a>`;
    })
    .join("");
  return `<section class="section-band"><div class="inner"><h2>Related word tools</h2><div class="link-grid">${links}</div></div></section>`;
}

function pageHtml(page) {
  const draft = readDraft(page.rank, page.slug);
  const content = markdownToHtml(draft, page);
  const brandNote = page.brand_or_game_specific
    ? `<aside class="notice">This is an unofficial helper page. Brand and game names are used only to describe compatibility with the searcher's task.</aside>`
    : "";
  const body = `<main>
    ${toolPanel(page)}
    <section class="content-section"><div class="content-inner">${content}${brandNote}</div></section>
    ${adjacentLinks(page)}
  </main>`;
  return layout({
    title: `${page.title} - Free ${clusterLabel(page)}`,
    description: pageDescription(page),
    canonical: page.url,
    schemaJson: schema(page),
    body,
  });
}

function homeHtml() {
  const featured = pages.slice(0, 12).map((page) => `<a class="tool-link" href="${page.url}">
    <strong>${escapeHtml(page.title)}</strong>
    <span>${escapeHtml(pageAction(page))}</span>
  </a>`).join("");
  const clusters = [...new Set(pages.map((page) => page.cluster))].map((cluster) => {
    const count = pages.filter((page) => page.cluster === cluster).length;
    return `<li><strong>${escapeHtml(cluster.replaceAll("-", " "))}</strong><span>${count} tools</span></li>`;
  }).join("");
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
    <section class="section-band alt"><div class="inner">
      <h2>Coverage map</h2>
      <ul class="cluster-list">${clusters}</ul>
    </div></section>
  </main>`;
  const homeSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: `${site.origin}/`,
    description: site.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${site.origin}/word-finder/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  });
  return layout({ title: `${site.name} - Word Unscrambler and Word Finder Tools`, description: site.description, body, schemaJson: homeSchema });
}

function toolsHtml() {
  const rows = pages.map((page) => `<a class="tool-link" href="${page.url}">
    <strong>${escapeHtml(page.title)}</strong>
    <span>${escapeHtml(page.cluster.replaceAll("-", " "))} · ${page.volume.toLocaleString()} searches/month</span>
  </a>`).join("");
  const body = `<main><section class="page-heading"><div class="inner">
    <p class="eyebrow">All tools</p><h1>Word solver tools</h1><p>Every launch page has a matching keyword, SERP/PAA brief, and interactive tool mode.</p>
  </div></section><section class="section-band"><div class="inner"><div class="tool-grid">${rows}</div></div></section></main>`;
  const toolsSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `All Word Solver Tools - ${site.name}`,
    url: `${site.origin}/tools/`,
    description: "Browse all word unscrambler, word finder, anagram, crossword, and word game solver pages.",
  });
  return layout({ title: `All Word Solver Tools - ${site.name}`, description: "Browse all word unscrambler, word finder, anagram, crossword, and word game solver pages.", canonical: "/tools/", body, schemaJson: toolsSchema });
}

function writeStaticAssets() {
  ensureDir(path.join(publicDir, "assets"));
  const css = `:root{--ink:#17202a;--muted:#5c6975;--line:#d7dde2;--paper:#fbfcf8;--panel:#ffffff;--accent:#0f766e;--accent-2:#b45309;--blue:#1d4ed8;--soft:#eef7f5;--shadow:0 18px 60px rgba(23,32,42,.10)}*{box-sizing:border-box}body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--ink);background:var(--paper);line-height:1.55}a{color:inherit}.site-header{position:sticky;top:0;z-index:10;display:flex;justify-content:space-between;align-items:center;gap:24px;padding:14px clamp(16px,4vw,48px);background:rgba(251,252,248,.94);border-bottom:1px solid var(--line);backdrop-filter:blur(14px)}.brand{display:flex;align-items:center;gap:10px;font-weight:800;text-decoration:none}.brand-mark{display:grid;place-items:center;width:38px;height:38px;border-radius:8px;background:var(--ink);color:white;letter-spacing:.02em}.top-nav{display:flex;gap:18px;flex-wrap:wrap}.top-nav a{text-decoration:none;color:var(--muted);font-weight:650;font-size:14px}.top-nav a:hover{color:var(--ink)}.home-hero{min-height:560px;display:grid;grid-template-columns:minmax(0,1fr) minmax(280px,520px);align-items:center;gap:40px;padding:64px clamp(18px,6vw,80px) 44px;background:linear-gradient(180deg,#f7fbf7 0%,#fbfcf8 100%)}.home-copy h1{font-size:clamp(42px,6vw,76px);line-height:1.02;margin:0 0 18px;letter-spacing:0}.home-copy p{font-size:18px;max-width:680px;color:var(--muted)}.eyebrow{text-transform:uppercase;letter-spacing:.08em;font-size:12px;font-weight:800;color:var(--accent)}.hero-actions,.button-row{display:flex;gap:12px;flex-wrap:wrap;margin-top:24px}.primary-link,.secondary-link,.primary-btn,.ghost-btn{border:0;border-radius:8px;padding:12px 16px;font-weight:800;text-decoration:none;cursor:pointer}.primary-link,.primary-btn{background:var(--accent);color:white}.secondary-link,.ghost-btn{background:white;color:var(--ink);border:1px solid var(--line)}.hero-asset{width:100%;max-width:520px;justify-self:center}.tool-panel{display:grid;grid-template-columns:minmax(260px,.8fr) minmax(320px,1.2fr);gap:28px;padding:44px clamp(18px,5vw,72px);background:#f3faf7;border-bottom:1px solid var(--line)}.tool-heading h1{font-size:clamp(34px,4.6vw,58px);line-height:1.05;margin:0 0 14px}.tool-heading p{color:var(--muted);font-size:17px}.solver-card{background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:20px;box-shadow:var(--shadow)}.field{display:grid;gap:6px;font-weight:750;color:var(--ink)}.field span{font-size:13px}.field-help{margin:8px 0 0;color:var(--muted);font-size:13px}.field textarea,.field input{width:100%;border:1px solid var(--line);border-radius:8px;padding:12px;font:inherit;background:#fff}.field textarea:focus,.field input:focus{outline:3px solid rgba(15,118,110,.18);border-color:var(--accent)}.field-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:14px}.results{margin-top:18px;border-top:1px solid var(--line);padding-top:16px;min-height:88px}.result-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(92px,1fr));gap:8px}.word-pill{border:1px solid var(--line);border-radius:8px;background:#fbfcff;padding:9px 10px;font-weight:800;text-align:center}.muted{color:var(--muted)}.content-section{padding:42px clamp(18px,5vw,72px);background:var(--paper)}.content-inner{max-width:920px}.content-inner h2{margin-top:34px;font-size:28px}.content-inner h3{margin-top:24px;font-size:20px}.content-inner p,.content-inner li{color:#2f3b45}.notice{border-left:4px solid var(--accent-2);background:#fff7ed;padding:14px 16px;border-radius:8px;margin-top:28px}.section-band{padding:42px clamp(18px,5vw,72px);border-top:1px solid var(--line);background:white}.section-band.alt{background:#f7f8fb}.inner{max-width:1180px;margin:0 auto}.tool-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:14px}.tool-link{display:grid;gap:7px;text-decoration:none;background:white;border:1px solid var(--line);border-radius:8px;padding:16px;min-height:118px}.tool-link:hover{border-color:var(--accent);box-shadow:0 10px 26px rgba(15,118,110,.09)}.tool-link span{color:var(--muted);font-size:14px}.link-grid{display:flex;gap:10px;flex-wrap:wrap}.link-grid a{padding:10px 12px;border:1px solid var(--line);border-radius:8px;text-decoration:none;background:white}.cluster-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px;padding:0;list-style:none}.cluster-list li{display:flex;justify-content:space-between;gap:10px;border:1px solid var(--line);border-radius:8px;padding:14px;background:white}.page-heading{padding:44px clamp(18px,5vw,72px);background:#f3faf7}.site-footer{padding:34px clamp(18px,5vw,72px);background:var(--ink);color:#dfe7ee}.site-footer a{color:white}@media(max-width:820px){.site-header{align-items:flex-start;flex-direction:column}.top-nav{gap:12px}.home-hero,.tool-panel{grid-template-columns:1fr}.home-hero{padding-top:40px}.field-grid{grid-template-columns:1fr}.hero-asset{max-width:330px}.tool-heading h1{font-size:36px}}`;
  fs.writeFileSync(path.join(publicDir, "assets/styles.css"), css);
  const app = `const WORDS=${JSON.stringify([...new Set(dictionary.map((word) => word.toLowerCase()))])};
const SCORE={a:1,b:3,c:3,d:2,e:1,f:4,g:2,h:4,i:1,j:8,k:5,l:1,m:3,n:1,o:1,p:3,q:10,r:1,s:1,t:1,u:1,v:4,w:4,x:8,y:4,z:10};
function normalize(value){return (value||"").toLowerCase().replace(/[^a-z?]/g,"");}
function canBuild(word,letters){const pool=normalize(letters).split("");let blanks=pool.filter(c=>c==="?").length;const counts={};for(const c of pool){if(c!=="?")counts[c]=(counts[c]||0)+1;}for(const c of word){if(counts[c])counts[c]--;else if(blanks)blanks--;else return false;}return true;}
function score(word){return word.split("").reduce((sum,c)=>sum+(SCORE[c]||0),0)}
function matchPattern(word,pattern){const p=normalize(pattern);if(!p)return true;if(word.length!==p.length)return false;return [...p].every((c,i)=>c==="?"||c===word[i]);}
function solve(card){const mode=card.closest("[data-tool-mode]")?.dataset.toolMode||card.dataset.toolMode||"letters";const rawLetters=card.querySelector('[data-role="letters"]').value;const letters=normalize(rawLetters);const contains=normalize(card.querySelector('[data-role="contains"]').value);const starts=normalize(card.querySelector('[data-role="starts"]').value);const ends=normalize(card.querySelector('[data-role="ends"]').value);const exclude=normalize(card.querySelector('[data-role="exclude"]').value);let len=Number(card.querySelector('[data-role="length"]').value||0);let pattern=card.querySelector('[data-role="pattern"]').value;if(mode==="wordle"&&!len)len=5;if((mode==="crossword"||mode==="wordle"||mode==="cryptogram")&&letters.includes("?")&&!pattern)pattern=letters;let candidates=WORDS.filter(w=>!len||w.length===len).filter(w=>!starts||w.startsWith(starts)).filter(w=>!ends||w.endsWith(ends)).filter(w=>!contains||contains.split("").every(c=>w.includes(c))).filter(w=>!exclude||!exclude.split("").some(c=>w.includes(c))).filter(w=>matchPattern(w,pattern));if(mode==="spelling"&&letters){const center=letters[0];const allowed=new Set(letters.split(""));candidates=candidates.filter(w=>w.length>=4&&w.includes(center)&&[...w].every(c=>allowed.has(c)));}else if(letters&&!(mode==="crossword"&&letters.includes("?"))&&!(mode==="wordle"&&letters.includes("?"))){candidates=candidates.filter(w=>canBuild(w,letters)||w.includes(letters));}candidates=[...new Set(candidates)].sort((a,b)=>b.length-a.length||score(b)-score(a)||a.localeCompare(b)).slice(0,120);const out=card.querySelector('[data-role="results"]');if(!candidates.length){out.innerHTML='<p class="muted">No matches yet. Try fewer filters, use ? for unknown letters, or check the pattern length.</p>';return;}out.innerHTML='<div class="result-list">'+candidates.map(w=>'<button class="word-pill" type="button" data-copy="'+w+'">'+w+'</button>').join("")+'</div><p class="muted">'+candidates.length+' matches shown. Tap a word to copy it.</p>';}
function sample(card){const mode=card.closest("[data-tool-mode]")?.dataset.toolMode||card.dataset.toolMode;const letters=card.querySelector('[data-role="letters"]');const length=card.querySelector('[data-role="length"]');const pattern=card.querySelector('[data-role="pattern"]');card.querySelectorAll("input,textarea").forEach(i=>i.value="");if(mode==="wordle"){letters.value="crane";length.value=5;card.querySelector('[data-role="exclude"]').value="tou";}else if(mode==="crossword"){letters.value="";pattern.value="c?a??";}else if(mode==="spelling"){letters.value="aglnort";}else if(mode==="ladder"){letters.value="cold";card.querySelector('[data-role="contains"]').value="warm";length.value=4;}else if(mode==="boggle"){letters.value="rstlneai";length.value=4;}else{letters.value="tca?rs";length.value="";}solve(card);}
document.addEventListener("click",async e=>{const btn=e.target.closest("button");if(!btn)return;const card=btn.closest(".solver-card");if(btn.dataset.action==="solve")solve(card);if(btn.dataset.action==="sample")sample(card);if(btn.dataset.action==="clear"){card.querySelectorAll("input,textarea").forEach(i=>i.value="");card.querySelector('[data-role="results"]').innerHTML='<p class="muted">Enter letters or a pattern to see matching words.</p>';}if(btn.dataset.copy){await navigator.clipboard?.writeText(btn.dataset.copy);btn.textContent="Copied";setTimeout(()=>btn.textContent=btn.dataset.copy,900);}});
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
  const urls = ["/", "/tools/", ...pages.map((page) => page.url)];
  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${site.origin}${url}</loc></url>`).join("\n")}\n</urlset>\n`);
  fs.writeFileSync(path.join(publicDir, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${site.origin}/sitemap.xml\n`);
}

fs.rmSync(publicDir, { recursive: true, force: true });
ensureDir(publicDir);
writeStaticAssets();
fs.writeFileSync(path.join(publicDir, "index.html"), homeHtml());
ensureDir(path.join(publicDir, "tools"));
fs.writeFileSync(path.join(publicDir, "tools/index.html"), toolsHtml());
for (const page of pages) writePage(page);
writeSitemap();

console.log(`Built ${pages.length + 2} pages into ${publicDir}`);
