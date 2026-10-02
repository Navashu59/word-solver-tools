# SEO Discovery Operations - 2026-10-01

## Current diagnosis

Google recorded 20 clicks from 9,814 impressions in the recent period. Its large September test for `scrabble cheat` and `wordle solver` had very low CTR and was withdrawn. This is not an indexation outage. Bing, DuckDuckGo, and Yahoo are validated channels: GA4 records 375, 53, and 48 organic sessions respectively in September, compared with 39 Google organic sessions.

## Completed technical discovery actions

- `public/d331d7c45aa374d35ff8e612c35642c5.txt` is the IndexNow key-verification file.
- Use the explicit submission script only for materially changed canonical pages after deployment. It prevents accidental submission of unbounded URLs.

```bash
INDEXNOW_HOST=wordsolvertools.org \
INDEXNOW_KEY=d331d7c45aa374d35ff8e612c35642c5 \
node scripts/indexnow-submit.mjs \
  https://wordsolvertools.org/missing-letters-solver/ \
  https://wordsolvertools.org/crossword-solver/
```

## External discovery queue

| Target type | Matching URL | Acceptance rule |
| --- | --- | --- |
| Crossword or word-game guide | Crossword and pattern solvers | Editorial resource with a real reference need. |
| Word-game classroom activity | Missing letters or word finder | Must provide genuine activity value. |
| Scrabble or Wordle strategy resource | Narrow supporting guide | Do not imply affiliation with any game owner. |

Do not purchase exact-match `cheat` links, create forum spam, or claim official game affiliation. Record source, target, referral sessions, engagement, and Google/Bing changes before expanding a channel.

## Review gates

- At day 14: Bing organic sessions remain 350+/month equivalent and Google has at least one long-tail phrase within the top 20.
- At day 30: Google organic clicks rise above 40/month or a long-tail landing page receives repeat Google sessions.
- Head terms remain a measurement signal, not the success criterion, until their CTR is competitive.
