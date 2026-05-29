# Scrabble Word Finder

You’re staring at your rack with seven tiles, and the board is wide open. You need a valid word that scores well, but your brain is stuck on the same three-letter combos. This tool is for that exact moment: enter your rack, optionally mark blank tiles with `?`, and get a sorted list of playable words. No sign-up, no fluff.

## When you need more than a dictionary

A standard dictionary tells you if a word exists. This finder tells you what words you can actually make from your specific set of tiles. It’s built for the middle of a game, not for studying word lists. You type in `A?RSTLE`, hit search, and instantly see that `STARLE` isn’t valid but `STAR` and `RATES` are. The score column lets you pick the highest-value play without manually calculating letter points.

## How blank tiles change your strategy

Blank tiles are wildcards, but they also cost you points because they score zero. The tool handles them automatically when you enter `?` for each blank. If you have two blanks, enter `??`. The results will show which letter each blank stands for, so you can see the trade-off between using a blank for a high-value letter versus saving it for a longer word. For example, with `?A?`, you might get `AA`, `AB`, `BA`, but also `ABA` - the blank lets you extend words in ways that aren’t obvious from the rack alone.

## Sorting by score vs. length

Most players want the highest score first, but sometimes you need a specific length to fit a tight spot on the board. The tool lets you sort by score (descending) or by length (shortest or longest). If you’re trying to land a double-word score, sort by score. If you need exactly a 5-letter word to bridge two premium squares, filter by length. You can also combine both: show only 5-letter words, sorted by score.

## Checking word validity before you play

Not every word in the dictionary is allowed in Scrabble. The tool uses the official Scrabble word list (TWL for North America, SOWPODS for international). If you’re playing a house rule or a variant, you can still use the results as a starting point, but always double-check with your group’s accepted list. The tool marks words that are only in certain dictionaries, so you know when a word might be challenged.

## Copying results without losing context

Once you find a word, you can copy it directly to your clipboard. The tool also copies the score and the word length, so you can paste it into a chat or notes app and remember why you chose it. This is useful if you’re playing online and want to keep a record of your best options.

## Common Questions

### What words can I make with my Scrabble letters?

Enter your rack letters in any order. Use `?` for blank tiles. The tool will generate candidate words from those letters, sorted by score by default. You can filter by word length or specific patterns (starts with, ends with, contains).

### Can I use blank tiles in a Scrabble word finder?

Yes. Enter `?` for each blank tile. The tool will treat it as a wildcard and show you all possible substitutions. The results will indicate which letter the blank represents in each word.

### How do Scrabble scores work?

Each letter has a point value (A=1, B=3, etc.). The tool calculates the base score for each word without board multipliers. You need to add premium squares (double/triple letter, double/triple word) yourself based on where you place the word.

### Is this word valid in Scrabble?

The tool checks against official Scrabble dictionaries. If a word is only valid in one dictionary (e.g., TWL but not SOWPODS), it will be noted. Always confirm with your game’s rules before playing.

### What is the highest scoring word from my tiles?

The tool sorts results by score descending by default. The top result is the highest-scoring word from your rack. If you have blanks, the highest-scoring word may use a blank for a high-value letter like Z or Q.

## Next tools to try

- [Scrabble Cheat](/scrabble-cheat/) – If you want strategy tips alongside word lists, this page frames the same tool as a learning aid for improving your game.
- [Words With Friends Cheat](/words-with-friends-cheat/) – Same core functionality but optimized for Words With Friends’ dictionary and scoring.
- [Wordle Solver](/wordle-solver/) – For when you need to narrow down a 5-letter word with known and excluded letters.
- [Anagram Solver](/anagram-solver/) – Enter any set of letters to find all possible anagrams, not limited to Scrabble words.
- [Letter Unscrambler](/unscramble-letters/) – Quick unscrambling for any word game, with length and pattern filters.
- [Word Finder](/word-finder/) – General-purpose word finder for crosswords, puzzles, and games.
- [Scrabble Word Checker](/scrabble-word-finder/) – Verify if a specific word is valid in Scrabble before you play it.
