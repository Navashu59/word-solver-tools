# GEO and SEO Completion Log - 2026-06-02

## Scope

Improve WordSolverTools.org for SEO and GEO without adding unsupported claims or making pages harder to read.

## Completed Changes

- Added generated `/llms.txt` with the site positioning, core tools, strategy guides, method notes, and limitations.
- Added visible `Sources and limits` blocks to priority support guides when there is a specific definition or rule source.
- Added `citation` URLs to Article structured data for guides that include source links.
- Corrected guide breadcrumb schema from a generic tools target to the strategy guide section.
- Updated the review date to 2026-06-02 because the pages and structured data were actually changed.

## Source Basis

- Merriam-Webster anagram definition: https://www.merriam-webster.com/dictionary/anagram
- Merriam-Webster pangram wordplay context: https://www.merriam-webster.com/wordplay/playing-with-words
- Hasbro Boggle product instructions: https://instructions.hasbro.com/en-ca/instruction/boggle
- WordSolverTools method page: https://wordsolvertools.org/how-it-works/

## Guardrails

- Do not claim the site is an official dictionary for Scrabble, Wordle, The New York Times, Words With Friends, Boggle, or any publisher.
- Do not claim every candidate word is accepted by a specific game.
- Do not claim a complete English dictionary.
- Keep source sections short and below the main explanatory content so readers are not forced through SEO/GEO material before using the guide.

## DeepSeek Review Notes

DeepSeek role review recommended method notes, limitations, llms.txt, and avoiding claims such as "official", "guaranteed accepted", and "complete dictionary". The implementation followed those recommendations.
