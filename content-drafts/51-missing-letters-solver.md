# Missing Letters Solver

Use this missing letters solver when part of a word is known and the blank positions are the problem. It is useful for crosswords, fill-in-the-blank puzzles, word games, and clue lists where you know the shape but not every letter.

## Enter the blanks first

Use ? for each missing position. For example, `c?a??` means a five-letter word with c in position one and a in position three. A complete pattern is stronger than a loose letter list because it tells the solver exactly where letters must land.

## Narrow the candidate list

- Add contains when a letter is confirmed but the position is unknown.
- Add starts with or ends with when the edge of the answer is fixed.
- Add exclude when a crossing proves a letter cannot appear.
- Leave exact-letter mode off unless every available letter must be used.
- Sort through the shortest matching group first when the puzzle gives a fixed answer length.

## Match candidates back to the clue

The tool cannot understand every clue. It returns words that fit the letters and filters. After that, use the clue meaning, crossing letters, tense, plural form, and theme to choose the answer.

## Similar tools

Use the [Crossword Solver](/crossword-solver/) when the clue matters most. Use the [Word Solver](/word-solver/) when you have loose letters. Use the [5 Letter Word Finder](/5-letter-word-finder/) for five-letter games and fixed-length puzzles.

## Common Questions

### What symbol should I use for a missing letter?

Use ? for unknown positions, such as c?a?? for a five-letter answer where the first letter is c and the third letter is a.

### Can I use only part of the pattern?

Yes. Enter what you know and use ? for the rest. More known positions usually produce a shorter, more useful answer list.

### Are these official crossword answers?

No. The tool returns candidate words from a built-in word list. Check the clue and crossing letters before filling the grid.
