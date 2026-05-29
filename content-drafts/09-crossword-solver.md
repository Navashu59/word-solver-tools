# Crossword Solver

You're halfway through a puzzle and stuck on a clue. You know the answer length, a couple of crossing letters, and maybe the clue itself. This tool is built for that moment - enter what you have, and get a ranked list of possible answers without sifting through a dictionary.

## Start with what you know

Type the clue if you have it, then set the answer length. If you have any letters from crossings, enter them as a pattern (e.g., `C?A??E?` for a seven-letter word with known letters in positions 1, 3, and 6). The tool will match against a broad word list and show the most common answers first. If the clue is vague or common, the list will be longer - that's normal.

## Narrow the list without guessing

Once you see results, use the include/exclude letters filter to remove words that can't fit. For example, if you know the answer has an 'R' but not in position 2, exclude that. If the list is still too long, add one more known letter. If it's empty, remove the weakest constraint first, usually an uncertain letter or an over-specific pattern.

## When the same clue has multiple answers

Crossword constructors reuse clues, and a single clue can map to several answers depending on the puzzle's theme or era. The tool groups answers by frequency, so you'll see the most likely match first. If that doesn't fit, scroll down - the answer you need might be less common but still valid.

## Pattern matching for tricky spots

If you have no clue but a few letters from crossings, use the pattern field alone. For instance, `?A??LE` will return all words with A in position 2 and LE at the end. This is especially useful when you're stuck on a long word and only have a few letters.

## Using the solver with themed puzzles

Themed puzzles often use obscure words or proper nouns. If your initial search returns nothing, try removing the clue and searching by pattern only. The tool's word list includes many proper nouns and archaic terms that appear in crosswords but not in everyday speech.

## Common Questions

### How do I solve a crossword clue with missing letters?

Enter the clue and the answer length, then use the pattern field to mark known letters with `?` for unknowns. For example, if you know the answer is 8 letters and the third letter is 'A', enter `??A?????` as the pattern. The tool will show only words matching that shape.

### How do I search crossword answers by pattern?

Use the pattern input field. Replace unknown letters with `?` and known letters with their actual characters. You can also use `*` for multiple unknown letters if you're unsure of the exact length.

### What does this clue mean?

The tool does not interpret clue text. Use it to test length and crossing-letter patterns, then use the clue meaning to choose the answer that fits the puzzle.

### How many letters is the answer?

Set the answer length in the tool before searching. If you're unsure, try the most likely exact lengths one at a time.

### Can the same clue have different answers?

Yes. Crossword clues often have multiple valid answers depending on the puzzle. The tool ranks them by frequency, but you should always verify against your puzzle's theme and crossing letters.

## Next tools to try

- [Crossword Clue Solver](/crossword-clue-solver/) – If you have a tricky clue and need to decode wordplay, this tool focuses on clue interpretation.
- [Crossword Puzzle Solver](/crossword-puzzle-solver/) – For when you're working on an entire puzzle grid and need help with multiple clues at once.
- [Crossword Help](/crossword-help/) – A guide with tips and strategies for solving crosswords faster.
- [Word Finder](/word-finder/) – If you're playing word games like Scrabble or Words With Friends, this tool helps you find words from your letter rack.
- [Anagram Solver](/anagram-solver/) – When you have a set of letters and need to find all possible words, including those that might fit a crossword clue.
