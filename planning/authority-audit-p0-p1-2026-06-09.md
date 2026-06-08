# WordSolverTools.org Authority Audit and P0/P1 Execution

Date: 2026-06-09
Site: `https://wordsolvertools.org`

## Data Checked

- GSC local record: `/Users/bluepha/seo-revenue-system/ops/sites/wordsolvertools/gsc_data.json`.
- GSC status: last saved 28-day record shows 0 clicks and 0 impressions; API pull still records 403 permission failure.
- Existing support page plan: `/Users/bluepha/seo-revenue-system/ops/sites/wordsolvertools/support_page_plan_2026-06-02.json`.
- Semrush exact checks saved to `research/authority-audit-semrush-2026-06-09.json`.
- DeepSeek deputy review saved to `research/deepseek-authority-audit-2026-06-09.json` with 1,085 total tokens.
- Existing SERP/PAA briefs reviewed for Scrabble, five-letter words, cryptogram, and word ladder.

## Key Semrush Signals

| Keyword | US volume | Decision |
|---|---:|---|
| `words without vowels` | 9,900 | Build P1 guide. Strong information intent that supports word finder and five-letter pages. |
| `two letter scrabble words` | 4,400 | Build P1 guide with dictionary/word-list caveats. |
| `scrabble two letter words` | 1,900 | Fold into the same two-letter Scrabble guide. |
| `word ladder game` | 1,300 | Hold for later; existing word ladder tool is thin but lower priority than no-vowel/Scrabble support. |
| `how to solve cryptograms` | 390 | Hold for later P2/P1 refresh; useful but lower volume. |
| `word ladder examples` | 210 | Hold as a future word ladder guide or section update. |
| `words with q without u` | 720 | Use inside the no-vowel guide rather than a standalone page. |
| `5 letter words with no vowels` | 4,400 | Use inside the no-vowel guide to avoid a narrow duplicate page. |

## Plan

### P0

1. Add a real `/guides/` hub for the existing strategy/support guide cluster.
2. Add `/guides/` to the main navigation.
3. Point guide breadcrumbs to `/guides/` instead of the homepage `/#strategy-guides` anchor.
4. Include `/guides/` in the sitemap.
5. Add parent-tool links to older strategy guides that did not have related tool links.

### P1

1. Add `/guides/two-letter-scrabble-words/`.
2. Add `/guides/words-without-vowels/`.
3. Keep both pages cautious: no claim of a complete official list; remind users to check the active game dictionary or word list.
4. Use search-intent headings without duplicating FAQ questions verbatim.
5. Update `llms.txt`, sitemap, homepage guide links, and related tool links through the generator.

## Completed

- Added `/guides/` collection page.
- Added `/guides/two-letter-scrabble-words/`.
- Added `/guides/words-without-vowels/`.
- Added parent-tool links for existing strategy guides:
  - Wordle Guessing Strategy
  - Scrabble Rack Strategy
  - How to Solve Crossword Clues
  - Anagram Solving Techniques
- Updated `scripts/generate-site.js` for guides hub, navigation, breadcrumbs, sitemap, and schema.
- Rebuilt `public/` with `SITE_ORIGIN=https://wordsolvertools.org`.

## Verification

- `node --check scripts/generate-site.js` passed.
- `node --check public/assets/app.js` passed.
- `SITE_ORIGIN=https://wordsolvertools.org npm run build` passed.
- JSON-LD parse check: 0 errors.
- Internal link check: 0 broken local links.
- Duplicate title check: 0 duplicate titles.
- Duplicate description check: 0 duplicate descriptions.
- Duplicate H1 check: 0 duplicate H1s.
- Heading-vs-FAQ exact duplicate check: 0 duplicates on the new guide pages.
- Playwright smoke:
  - `/guides/`, `/guides/two-letter-scrabble-words/`, `/guides/words-without-vowels/`, and `/word-finder/` loaded locally.
  - Word finder still returned results after a no-vowel filter test.
  - `/guides/` and `/guides/words-without-vowels/` had no mobile horizontal overflow at 390px.

## Held Topics

- `how to solve cryptograms`: useful future guide or cryptogram page refresh, but lower priority than the two implemented P1 pages.
- `word ladder game`, `word ladder examples`, `word ladder rules`: keep as a future word ladder support batch.
- `words with q without u`: included as a section under `/guides/words-without-vowels/`, not a standalone page now.
