# Word Solver Tools Support Page Authority Plan

Generated: 2026-06-02

Purpose: add information-first support pages that cover search intent the tool pages should not carry, while strengthening Google's understanding of Word Solver Tools as an authority for letter-based word solving.

## Validation Sources

- Semrush support-page seed validation: `research/support-pages-semrush-validation-2026-06-02.json`
- Semrush question-seed retry: `research/support-pages-question-seeds-semrush-2026-06-02.json`
- Existing page-level Semrush evidence: `research/semrush-page-keyword-evidence-2026-06-01.json`
- Real SERP gap evidence: `research/support-pages-real-serp-gap-2026-06-02.json`
- Real SERP gap summary: `research/support-pages-real-serp-gap-summary-2026-06-02.md`
- GSC Playwright pull: `/Users/bluepha/seo-revenue-system/ops/sites/wordsolvertools/gsc_data.json`
- GSC API attempt: `research/gsc-performance-wordsolvertools-2026-06-02.json`

## GSC Status

- GSC property: `sc-domain:wordsolvertools.org`
- Property setup: verified in project status and reachable by Playwright profile.
- Sitemap status from 2026-06-01: submitted successfully, 61 pages discovered.
- Current 28-day GSC performance from Playwright on 2026-06-02: 0 clicks, 0 impressions.
- Search Console API service account status: 403 for `sc-domain:wordsolvertools.org`; service account needs to be added to the property before API-based query/page pulls can be used.

Decision impact: GSC cannot yet prioritize support pages by observed query exposure. The first support-page batch should use Semrush demand, topical adjacency, and cannibalization risk.

## Build Queue

| Status | Priority | URL | Primary keyword | Semrush evidence | Parent tools | Decision |
|---|---:|---|---|---|---|---|
| deployed | P0 | `/guides/spelling-bee-pangram/` | spelling bee pangram | `spelling bee pangram` 9,900; `pangram solver` 6,600; `pangram today` 18,100 | `/spelling-bee-solver/`, `/spelling-bee-buddy/`, `/nyt-spelling-bee-solver/` | Live on Cloudflare Pages. |
| deployed | P0 | `/guides/anagram-examples/` | anagram examples | `anagram examples` 1,900; related cluster includes `anagram solver` 246,000 | `/anagram-solver/`, `/anagram-generator/`, `/anagram-maker/` | Live on Cloudflare Pages. |
| deployed | P0 | `/guides/boggle-rules/` | boggle rules | `boggle rules` 1,900 | `/boggle-solver/` | Live on Cloudflare Pages. |
| deployed | P0 | `/guides/how-to-unscramble-words/` | how to unscramble words | `how to unscramble words` 880 | `/word-unscrambler/`, `/unscramble-words/`, `/unscramble-letters/`, `/words-with-these-letters/` | Live on Cloudflare Pages. |
| deferred | P1 | `/guides/crossword-patterns-and-known-letters/` | crossword pattern solver | `crossword pattern solver` 30; adjacent terms include `missing letter crossword` 6,600 and `crossword help` 14,800 | `/crossword-solver/`, `/crossword-clue-solver/`, `/crossword-help/` | Build after P0 if indexing and guide crawl paths are healthy. Avoid tool-page cannibalization. |
| deferred | P1 | `/guides/spelling-bee-rules/` | spelling bee rules | `spelling bee rules` 590 | `/spelling-bee-solver/`, `/spelling-bee-buddy/` | Consider merging into pangram page first; split only if SERP/GSC supports. |
| deferred | P1 | `/guides/wordle-repeated-letters/` | repeated letters in wordle | `repeated letters in wordle` 20 | `/wordle-solver/`, `/wordle-helper/`, `/5-letter-word-finder/` | Helpful explanation topic, but Semrush demand is weak. |
| deferred | P2 | `/guides/word-ladder-rules/` | word ladder rules | `word ladder rules` 20 | `/word-ladder-solver/` | Authority-depth page only; not a first-batch traffic play. |

## Demoted Candidates

| Candidate | Semrush result | Current treatment |
|---|---|---|
| `/guides/word-unscrambler-vs-anagram-solver/` | nothing found | Do not create as a standalone page. Add a section inside `/guides/how-to-unscramble-words/`. |
| `/guides/blank-tiles-and-wildcards-in-word-solvers/` | `scrabble blank tiles` 0; `word solver wildcard` 0; `wildcard word finder` 20 | Do not create as a standalone page. Use as a section in unscramble/Scrabble pages. |
| `/guides/scrabble-vs-words-with-friends-letter-values/` | exact 0 | Defer. Only revisit if GSC shows relevant impressions. |
| `/guides/word-finder-filters/` | nothing found | Do not create standalone. Keep as a module on `/word-finder/` and related pages. |
| `/guides/5-letter-word-patterns/` | 0 | Defer. |
| `/guides/words-with-these-letters-explained/` | `words with these letters` 74,000, but the site already has `/words-with-these-letters/` | Do not create. Strengthen the existing tool page to avoid cannibalization. |

## Implementation Requirements

For each P0 support page:

- Add the page under `/guides/`.
- Keep the page informational, not a duplicate tool page.
- Link to the primary parent tool in the first screen.
- Add 2-4 contextual links to same-cluster tools.
- Add a `Related tools` block near the end.
- Add the guide to the sitemap and guide navigation/link surfaces.
- Add a `Related guides` or support-guide link block on the parent tool pages.
- Use Article/FAQ schema only where the visible content supports it.
- Avoid claims about official dictionaries, official NYT lists, or complete answer databases unless the visible tool actually provides them.

## Tracking Checklist

- [x] Create `/guides/spelling-bee-pangram/`
- [x] Create `/guides/anagram-examples/`
- [x] Create `/guides/boggle-rules/`
- [x] Create `/guides/how-to-unscramble-words/`
- [x] Add parent-tool internal links for all four P0 pages
- [x] Add guide navigation links and sitemap entries
- [x] Rebuild with `SITE_ORIGIN=https://wordsolvertools.org npm run build`
- [x] Run internal link validation
- [x] Run JSON-LD validation
- [x] Deploy to Cloudflare Pages
- [ ] Submit or inspect new URLs in GSC after deployment
- [ ] Recheck GSC after 14-30 days

## 2026-06-02 Local Implementation Pass

Implemented the four P0 support pages in `planning/strategy-guides.json` and updated `scripts/generate-site.js` so parent tool pages show matching support-guide links. Local production build and validation passed:

- Build: `SITE_ORIGIN=https://wordsolvertools.org npm run build`
- HTML files: 66
- Indexable HTML: 65
- Sitemap URLs: 65
- Broken internal links: 0
- JSON-LD parse errors: 0
- Browser DOM smoke test: passed for the four new guides plus `/spelling-bee-solver/` and `/word-unscrambler/`
- DeepSeek content review: passed with no material findings, saved at `research/deepseek-support-pages-review-2026-06-02.json`
- Deployment: GitHub Actions runs `26806974064` and `26807098188` completed successfully. Live checks returned HTTP 200 for all four P0 support pages and confirmed sitemap inclusion.
