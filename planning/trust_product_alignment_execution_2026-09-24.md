# WordSolverTools Trust and Product Alignment Execution — 2026-09-24

## Verified baseline

- GSC 90-day window ending 2026-09-21: 23 clicks, 13,244 impressions, 0.2% CTR, average position 24.5.
- `scrabble cheat`: 4,876 impressions, 4 clicks, 0.1% CTR, position 8.7.
- `wordle solver`: 3,681 impressions, 3 clicks, 0.1% CTR, position 11.2.
- Last seven complete data days: 9,585 impressions and 18 clicks versus 3,468 impressions and 6 clicks in the preceding seven days.
- URL Inspection: 22 of 45 sitemap URLs indexed, 23 not indexed, zero technical errors.
- The September 16 Wordle/Scrabble update does not yet have a complete 14-day observation window.

## Research

- Checked live page output, generated schema, filtering code, sitemap, canonical behavior, redirects and favicon requests.
- Ran a live Google AI Mode query for `how do I use a wordle solver with repeated letters` and compared cited answer units with the site's guide and actual tool behavior.
- Used DeepSeek as a second-pass analyst. Its recommendation to freeze title changes until a complete observation window was accepted. Final implementation decisions were checked against repository code and live data.

## Critical mismatch found

The Wordle page claimed dedicated green/yellow/gray position controls, an `allow duplicates` switch, information-gain ranking, answer/test-word separation and automatic hard-mode support. The live tool does not implement those features. It currently filters by pattern, required letters, excluded letters, prefix, suffix and length, then sorts by length, base tile score and alphabetical order.

## Changes shipped

- Corrected Wordle copy, metadata and `WebApplication.featureList` to describe the current product accurately.
- Removed the unverified `reviewedBy: Independent Developer` Person schema.
- Changed guide authorship to the site organization instead of an invented person.
- Added `/methodology/` with the current 227,630-entry word-list count, source, build fingerprint, filtering behavior, sorting and limitations.
- Added `/editorial-policy/` with product-claim verification and AI-assistance disclosure.
- Added `/corrections/` and recorded the Wordle claim correction.
- Added trust-page links to the global footer and sitemap with accurate last-modified dates.
- Added `/favicon.ico` compatibility redirect to the working SVG icon.

## Product follow-up

The current word list depends on the build machine's system dictionary plus a seed list. Replace it with a versioned repository artifact before claiming reproducible dictionary coverage. For the Wordle tool, consider implementing per-position color states, repeated-letter minimum/maximum counts, hard-mode validation and a real information-gain score before restoring those claims.

## Frozen experiments

Until at least 2026-09-30, do not change the title, H1 or URL of `/wordle-solver/` or `/scrabble-cheat/`. After the full window, a CTR experiment is eligible only when a query has at least 500 impressions, average position is better than 15, and CTR remains below 0.5%. Change one snippet variable per 14-day round.

## Verification

- `npm run check` passed.
- 48 indexable pages passed the content audit.
- No warnings or near-duplicate failures.
