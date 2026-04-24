/**
 * Word Search Grid Generator
 * Generates a 2D grid with hidden Cyrillic words placed mostly in the center.
 * Deterministic: same words always produce the same grid (based on seed).
 */

type Direction = 'horizontal' | 'vertical' | 'diagonal';

export interface PlacedWord {
  word: string;
  startRow: number;
  startCol: number;
  direction: Direction;
  cells: { row: number; col: number }[];
}

// Frequent Cyrillic letters for filler
const FILLER_CHARS = 'АОЕИТНРСЛВУПКГДЗБМХФЧ';

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

function directionDelta(dir: Direction): [number, number] {
  switch (dir) {
    case 'horizontal': return [0, 1];
    case 'vertical':   return [1, 0];
    case 'diagonal':   return [1, 1];
  }
}

function placeWord(
  grid: string[][],
  word: string,
  size: number,
  directions: Direction[],
  rand: () => number,
  margin: number,
): PlacedWord | null {
  const upper = word.toUpperCase();
  const len = upper.length;

  const shuffledDirs = [...directions].sort(() => rand() - 0.5);

  for (let attempt = 0; attempt < 200; attempt++) {
    const dir = shuffledDirs[attempt % shuffledDirs.length];
    const [dr, dc] = directionDelta(dir);

    // Keep words mostly in the center (margin from edges)
    const minRow = margin;
    const maxRow = size - margin - (dir === 'vertical' || dir === 'diagonal' ? len : 1);
    const minCol = margin;
    const maxCol = size - margin - (dir === 'horizontal' || dir === 'diagonal' ? len : 1);

    if (maxRow < minRow || maxCol < minCol) continue;

    const row = minRow + Math.floor(rand() * (maxRow - minRow + 1));
    const col = minCol + Math.floor(rand() * (maxCol - minCol + 1));

    // Check if cells are free or already contain the same letter (overlap ok)
    let fits = true;
    for (let i = 0; i < len; i++) {
      const r = row + i * dr;
      const c = col + i * dc;
      if (r < 0 || r >= size || c < 0 || c >= size) { fits = false; break; }
      const existing = grid[r][c];
      if (existing !== '' && existing !== upper[i]) { fits = false; break; }
    }

    if (!fits) continue;

    // Place the word
    const cells: { row: number; col: number }[] = [];
    for (let i = 0; i < len; i++) {
      const r = row + i * dr;
      const c = col + i * dc;
      grid[r][c] = upper[i];
      cells.push({ row: r, col: c });
    }

    return { word: upper, startRow: row, startCol: col, direction: dir, cells };
  }

  return null; // Could not place this word
}

export interface WordSearchGridResult {
  grid: string[][];
  placedWords: PlacedWord[];
  failedWords: string[];
}

export function generateWordSearchGrid(
  words: string[],
  size = 10,
  directions: Direction[] = ['horizontal', 'vertical'],
  marginFraction = 0.15,
): WordSearchGridResult {
  const rand = makePRNG(wordSeed(words));
  const grid: string[][] = Array.from({ length: size }, () => Array(size).fill(''));
  const placedWords: PlacedWord[] = [];
  const failedWords: string[] = [];

  // Sort words longest first for better placement
  const sorted = [...words].sort((a, b) => b.length - a.length);
  const margin = Math.max(1, Math.round(size * marginFraction));

  for (const word of sorted) {
    const placed = placeWord(grid, word, size, directions, rand, margin);
    if (placed) {
      placedWords.push(placed);
    } else {
      // Retry with margin=1 as fallback
      const fallback = placeWord(grid, word, size, directions, rand, 1);
      if (fallback) {
        placedWords.push(fallback);
      } else {
        failedWords.push(word);
      }
    }
  }

  // Fill empty cells with random filler letters
  const fillerArr = FILLER_CHARS.split('');
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === '') {
        grid[r][c] = fillerArr[Math.floor(rand() * fillerArr.length)];
      }
    }
  }

  return { grid, placedWords, failedWords };
}

/**
 * Check if a selection of cells spells a hidden word.
 * Returns the word (uppercased) if valid, null otherwise.
 */
export function validateSelection(
  grid: string[][],
  startRow: number,
  startCol: number,
  endRow: number,
  endCol: number,
  hiddenWords: string[],
): string | null {
  const dr = Math.sign(endRow - startRow);
  const dc = Math.sign(endCol - startCol);

  // Validate direction
  const rowSpan = Math.abs(endRow - startRow);
  const colSpan = Math.abs(endCol - startCol);
  if (rowSpan !== 0 && colSpan !== 0 && rowSpan !== colSpan) return null; // not a valid direction

  const len = Math.max(rowSpan, colSpan) + 1;
  let selected = '';
  for (let i = 0; i < len; i++) {
    const r = startRow + i * dr;
    const c = startCol + i * dc;
    if (r < 0 || r >= grid.length || c < 0 || c >= (grid[0]?.length ?? 0)) return null;
    selected += grid[r][c];
  }

  const upper = selected.toUpperCase();
  const upperWords = hiddenWords.map(w => w.toUpperCase());
  return upperWords.includes(upper) ? upper : null;
}
