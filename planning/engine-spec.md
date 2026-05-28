# Solver Engine Spec

## Core Engine

The site should use one shared word-solving engine with page-specific modes.

## Dictionary Data

- Base English word list with frequency/commonness score.
- Game-specific dictionaries or rule modes where legally and practically acceptable.
- Word metadata: length, score values, commonness, definitions where available.

## Shared Controls

- Letter input
- Wildcard / blank tile support using `?`
- Exact letters vs contains letters
- Required letters
- Excluded letters
- Starts with
- Ends with
- Contains sequence
- Known position pattern
- Word length
- Sort by length, score, commonness, alphabetical
- Copy/export results

## Page-Specific Modes

### Word Unscrambler
Use all letters or any subset, wildcards, length groups, copyable results.

### Scrabble Word Finder
Rack input, blank tiles, score sorting, dictionary note, optional board constraints later.

### Wordle Solver
Green/yellow/gray grid, required letters, excluded letters, repeated-letter handling, spoiler-safe hints.

### Anagram Solver
Exact/all letters, phrase mode, multi-word results, length filters.

### Crossword Solver
Clue input, pattern input, answer length, known letters, ranked candidates.

### Word Search Solver
Grid input, target word list, direction search, path highlighting.

### Boggle Solver
4x4/5x5 grid, adjacency path validation, scoring, path highlights.

### Cryptogram Solver
Cipher text, manual mapping locks, frequency hints, candidate words.

### Word Ladder Solver
Start/end words, shortest path, alternate paths, dictionary choice.

## Non-Functional Requirements

- Works well on mobile.
- Results update quickly after input.
- No registration for core use.
- Avoid intrusive ads around input and result areas.
- Core solving should run client-side where feasible.
