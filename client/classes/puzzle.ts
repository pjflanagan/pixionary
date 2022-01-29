import { Pixel } from "./pixel"

// Drawing
export type DrawingTitle = {
  name: string;
  source: string;
}

export type DrawingSubmission = {
  title: DrawingTitle;
  pixels: Pixel[];
}

// Puzzle

export type PuzzleAnswer = {
  // TODO: maybe get rid of the name hash, we should show which letters they guessed right
  namehash: string;
  wordLengths: number[];
}

export type RevealedPuzzleAnswer = PuzzleAnswer & {
  title: DrawingTitle;
}

export type Puzzle = {
  answer: PuzzleAnswer;
  pixels: Pixel[];
}


export const getPuzzleAnswer = async (answer: PuzzleAnswer): Promise<RevealedPuzzleAnswer> => {
  // SELECT value FROM answer WHERE hash=answer.hash;
  return {
    ...answer,
    title: {
      name: 'Louise',
      source: `Bob's Burgers`
    }
  }
}