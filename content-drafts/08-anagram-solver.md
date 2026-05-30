# Anagram Solver

You’re staring at a jumble of letters from a crossword clue, a word game, or a name you want to rearrange. This anagram solver is built for that moment: enter the letters, then use length, contains, starts with, ends with, exclude, and pattern filters to narrow the candidate words. No fluff, just a faster way to find rearrangements that fit your puzzle.

## When you need a full-letter anagram

Sometimes the puzzle requires using every letter you entered - no leftovers. Use the length filter to match the number of letters you have, then check the result against your original letters before playing it. This is common in rack-based word games where you are trying to use every tile, but the final rule check still belongs to the game or dictionary you are using.

## Finding shorter words from a longer set

Not every puzzle demands a full anagram. If you have a rack of seven letters but only want a five-letter word, set the length field to 5 and scan the candidates. This is useful when you are stuck with a long set of letters and need a shorter play to open up the board.

## Anagrams for phrases and names

You can enter a phrase or name, but the current tool returns word candidates rather than building polished multi-word phrases automatically. For name games, use the results as raw material: copy promising words, combine them manually, and keep the final phrase readable instead of forcing every obscure result.

## Filtering results by length and letter rules

After you generate results, the list can be long. Narrow it down with length, contains, starts with, ends with, and exclude filters. If you know a word pattern, use `?` for unknown letters, such as `c?a??` for a five-letter word with C first and A third.

## Using wildcards for unknown letters

If you have a partial pattern or a blank tile, use a question mark or asterisk as a wildcard. The solver treats it as any letter. For example, enter “?a?e” to find all four-letter words with A in the second position and E in the fourth. This works across all modes and is a lifesaver when you’re missing a letter in a crossword or word game.

## Common Questions

### How do I solve an anagram?

Enter the letters or phrase into the input box, click Solve, then scan the results. Use length and pattern filters when the list is too broad.

### Does an anagram have to use every letter?

An anagram traditionally uses all letters, but many word-game searches only need words made from some of the letters. If you want a full-letter anagram, set the length to the exact number of letters you entered and manually confirm the letters before using the answer.

### Can I make anagrams from a name?

Yes. Enter any name or phrase to find word candidates from those letters. For multi-word name anagrams, combine the best candidates manually so the phrase still sounds natural.

### Can anagrams be more than one word?

Yes, but this page does not automatically build every multi-word phrase. Use the tool to find strong single-word candidates, then combine them yourself for phrase-based puzzles or name anagrams.

### How do I filter anagrams by length?

After entering your letters, use the length field. Set an exact word length to show only candidates that fit that size, then combine it with contains, starts with, ends with, exclude, or pattern filters.

## Next tools to try

- [Anagram Generator](/anagram-generator/) – Use this when you want to create anagrams for fun or inspiration, not just solve a puzzle.
- [Anagram Maker](/anagram-maker/) – A playful tool for making name anagrams or custom word rearrangements.
- [Anagram](/anagram/) – The general resource page for understanding anagrams and exploring all related tools.
- [Word Solver](/word-solver/) – If you have a pattern or partial word, this tool fills in the blanks.
- [Scrabble Word Finder](/scrabble-word-finder/) – Optimized for Scrabble tile racks and board positions.
- [Words With Friends Cheat](/words-with-friends-cheat/) – Unofficial helper for finding high-scoring plays in Words With Friends.
- [Crossword Solver](/crossword-solver/) – Enter clue patterns and letter counts to solve crossword clues.
