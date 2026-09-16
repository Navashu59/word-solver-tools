# WordSolverTools Optimization Execution - 2026-09-16

## Scope

- Refreshed `/wordle-solver/` around existing GSC opportunity for `wordle solver tool` and related helper queries.
- Refreshed `/scrabble-cheat/` around the low-CTR opportunity for `word finder scrabble cheat`.
- Added page-level SEO title/meta overrides in `scripts/generate-site.js` so search snippets can be tuned without changing H1, navigation labels, or tool names.
- Updated `planning/page-map.json` lastmod for `/wordle-solver/` and `/scrabble-cheat/`.
- Rebuilt static output into `public/`.

## Wordle Solver Changes

- Added clearer long-tail sections for:
  - green, yellow, and gray letter rules
  - safe clue-entry order
  - hard mode usage
  - handling too many candidate answers
- Preserved spoiler-safe framing and unofficial-helper caveat.
- SEO title: `Wordle Solver - Green, Yellow & Gray Letter Helper`.

## Scrabble Cheat Changes

- Added clearer long-tail sections for:
  - finding words from rack letters
  - using one or two blank tiles
  - hooks and board placement
  - score and dictionary caveats
- Avoided claiming official word validity; final play still depends on the active dictionary and board.
- SEO title: `Scrabble Cheat - Word Finder for Rack Letters & Blanks`.

## DeepSeek/Codex Split

- DeepSeek supplied draft snippets and section ideas for Wordle and Scrabble.
- Codex reviewed for factual boundaries, removed overclaims, implemented final source changes, regenerated pages, and ran quality checks.

## Validation

- `npm run build` passed.
- `npm run audit:content` passed:
  - 45 indexable pages
  - 0 failures
  - 0 warnings
  - 0 similarity findings

## Observation

- Review after 14-21 days:
  - `/wordle-solver/` impressions, clicks, CTR, and average position for `wordle solver tool`, `wordle helper tool`, and related long-tail queries.
  - `/scrabble-cheat/` impressions/clicks for `word finder scrabble cheat`, `scrabble cheat`, and blank-tile/hook queries.
  - Guardrail: homepage and `/word-solver/` should not lose query coverage from the more specific Wordle/Scrabble changes.
