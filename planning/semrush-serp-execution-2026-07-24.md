# Semrush and SERP Execution - 2026-07-24

## Evidence

- GSC through 2026-07-21 shows the strongest current ownership on
  `/jumble-solver/` and `/wordle-solver/`.
- Semrush US reports 110,000 searches for `jumble solver`, 550,000 for
  `wordle solver`, 201,000 for `wordle helper`, 90,500 for `wordle finder`,
  and 60,500 for `wordle cheat`.
- Live solver results use one functional owner with patterns, wildcards,
  required/excluded letters, sorting, and grouped answers rather than separate
  copies for every synonym.
- DeepSeek reviewed the evidence as the data and strategy deputy. It supported
  protecting Jumble and Wordle and rejected a mass redirect.

## Executed

- Kept `/jumble-solver/`, `/wordle-solver/`, and the generic owners unchanged.
- Consolidated the same-product Wordle aliases:
  - `/wordle-helper/` to `/wordle-solver/`
  - `/wordle-finder/` to `/wordle-solver/`
  - `/wordle-cheat/` to `/wordle-solver/`
- Removed active internal links to the retired aliases.
- Kept retired URLs out of the sitemap and added permanent edge redirects.

## Deliberately Not Executed

- No generic word-solver redirect batch. The current owner pages do not yet have
  enough indexed query ownership to absorb a broad migration safely.
- No change to Jumble first-screen behavior or URL because it carries the
  largest site-level query signal.

## Measure

Compare clean 14-day and 28-day windows for Wordle owner impressions, helper/finder
query transfer, average position, indexed URL count, and redirect errors. Roll back
only if the owner loses more than 30% of the combined cluster impressions without
query transfer.
