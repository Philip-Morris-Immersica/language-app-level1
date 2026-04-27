/**
 * Word Search Grid Generator — Horizontal-only mode
 *
 * Layout: one word per row, placed horizontally.
 * Each row has the word + 1-2 filler letters on the sides (randomized start column).
 * Result is a compact, mobile-friendly strip-style grid.
 *
 * Deterministic: same words always produce the same grid (seeded PRNG).
 */

// Frequent Cyrillic letters for filler (excluding rare letters)
const FILLER_CHARS = 'АОЕИТНРСЛВУПКГДЗБМХФЧЙЯЪ';

// Simple seeded pseudo-random number generator (xorshift)
function makePRNG(seed: number) {
  let s = seed || 1;
  return () => {
    s ^= s << 13;
    s ^= s >> 17;
    s ^= s << 5;
    return Math.abs(s) / 2147483648;
  };
}

function wordSeed(words: string[]): number {
  return words.join('').split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
}

export interface PlacedWord {
  word: string;       // Uppercase
  row: number;        // Row index in grid
  startCol: number;   // First letter column
  endCol: number;     // Last letter column (inclusive)
}

export interface HorizontalGridResult {
  grid: string[][];           // [rows][cols] of uppercase Cyrillic chars
  placedWords: PlacedWord[];  // Where each word was placed
  rows: number;
  cols: number;
}

/**
 * Generate a horizontal word-search grid.
 * One word per row, with `padding` filler letters on each side (max).
 *
 * @param words Array of words to hide (case-insensitive)
 * @param padding Filler letters on each side of word (default 1, so cols = longest + 2)
 */
export function generateHorizontalWordGrid(
  words: string[],
  padding = 1,
): HorizontalGridResult {
  const upperWords = words.map((w) => w.toUpperCase());
  const longest = upperWords.reduce((max, w) => Math.max(max, w.length), 0);
  const cols = longest + padding * 2;
  const rows = upperWords.length;

  const rand = makePRNG(wordSeed(upperWords));

  // Shuffle word order so that the grid layout is varied (not in input order)
  const shuffledIndices = upperWords.map((_, i) => i).sort(() => rand() - 0.5);
  const orderedWords = shuffledIndices.map((i) => upperWords[i]);

  const grid: string[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(''),
  );
  const placedWords: PlacedWord[] = [];

  orderedWords.forEach((word, row) => {
    const len = word.length;
    const maxStart = cols - len;
    // Randomize start column so words don't all align in the same column
    const startCol = maxStart > 0 ? Math.floor(rand() * (maxStart + 1)) : 0;

    for (let i = 0; i < len; i++) {
      grid[row][startCol + i] = word[i];
    }

    placedWords.push({
      word,
      row,
      startCol,
      endCol: startCol + len - 1,
    });
  });

  // Fill empty cells with random Cyrillic letters
  const fillerArr = FILLER_CHARS.split('');
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '') {
        grid[r][c] = fillerArr[Math.floor(rand() * fillerArr.length)];
      }
    }
  }

  return { grid, placedWords, rows, cols };
}

// ─── 2-D Word Search Grid (horizontal + vertical + optional diagonal) ──────────

export interface GridResult {
  grid: string[][];
  placedWords: Array<{ word: string; cells: string[] }>;
}

type Direction = 'horizontal' | 'vertical' | 'diagonal';

/**
 * Generate an N×N word-search grid placing words in the allowed directions.
 * Returns the grid and metadata about placed words.
 */
export function generateWordSearchGrid(
  words: string[],
  size: number,
  directions: readonly Direction[],
): GridResult {
  const upperWords = words.map((w) => w.toUpperCase());
  const rand = makePRNG(wordSeed(upperWords));

  const grid: string[][] = Array.from({ length: size }, () =>
    Array(size).fill(''),
  );
  const placed: Array<{ word: string; cells: string[] }> = [];

  const allDirs: Array<[number, number]> = [];
  if (directions.includes('horizontal')) { allDirs.push([0, 1]); allDirs.push([0, -1]); }
  if (directions.includes('vertical'))   { allDirs.push([1, 0]); allDirs.push([-1, 0]); }
  if (directions.includes('diagonal'))   { allDirs.push([1, 1]); allDirs.push([1, -1]); allDirs.push([-1, 1]); allDirs.push([-1, -1]); }

  for (const word of upperWords) {
    let success = false;
    // Try random positions up to 200 times
    for (let attempt = 0; attempt < 200 && !success; attempt++) {
      const [dr, dc] = allDirs[Math.floor(rand() * allDirs.length)];
      const row = Math.floor(rand() * size);
      const col = Math.floor(rand() * size);
      const endRow = row + dr * (word.length - 1);
      const endCol = col + dc * (word.length - 1);
      if (endRow < 0 || endRow >= size || endCol < 0 || endCol >= size) continue;

      // Check for conflicts
      let ok = true;
      for (let i = 0; i < word.length; i++) {
        const r = row + dr * i;
        const c = col + dc * i;
        if (grid[r][c] !== '' && grid[r][c] !== word[i]) { ok = false; break; }
      }
      if (!ok) continue;

      // Place the word
      const cells: string[] = [];
      for (let i = 0; i < word.length; i++) {
        const r = row + dr * i;
        const c = col + dc * i;
        grid[r][c] = word[i];
        cells.push(`${r}-${c}`);
      }
      placed.push({ word, cells });
      success = true;
    }
  }

  // Fill remaining cells with random Cyrillic
  const fillerArr = FILLER_CHARS.split('');
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === '') {
        grid[r][c] = fillerArr[Math.floor(rand() * fillerArr.length)];
      }
    }
  }

  return { grid, placedWords: placed };
}

/**
 * Validate a selection from (r1,c1) to (r2,c2) — returns the matched word
 * (uppercase) if it matches one of hiddenWords, otherwise null.
 */
export function validateSelection(
  grid: string[][],
  r1: number,
  c1: number,
  r2: number,
  c2: number,
  hiddenWords: string[],
): string | null {
  const dr = Math.sign(r2 - r1);
  const dc = Math.sign(c2 - c1);
  const len = Math.max(Math.abs(r2 - r1), Math.abs(c2 - c1)) + 1;

  let selected = '';
  for (let i = 0; i < len; i++) {
    const r = r1 + dr * i;
    const c = c1 + dc * i;
    if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length) return null;
    selected += grid[r][c];
  }

  const upper = hiddenWords.map((w) => w.toUpperCase());
  if (upper.includes(selected)) return selected;
  // Also check reversed
  const reversed = selected.split('').reverse().join('');
  if (upper.includes(reversed)) return reversed;
  return null;
}

/**
 * Find the placed word that covers the given cell (if any).
 * Used by the single-tap UX: tap any cell → resolve to the word it belongs to.
 */
export function findWordAtCell(
  placedWords: PlacedWord[],
  row: number,
  col: number,
): PlacedWord | null {
  for (const pw of placedWords) {
    if (pw.row === row && col >= pw.startCol && col <= pw.endCol) {
      return pw;
    }
  }
  return null;
}

/**
 * Get all cells (as "row-col" strings) covered by a placed word.
 */
export function getWordCellKeys(pw: PlacedWord): string[] {
  const keys: string[] = [];
  for (let c = pw.startCol; c <= pw.endCol; c++) {
    keys.push(`${pw.row}-${c}`);
  }
  return keys;
}
