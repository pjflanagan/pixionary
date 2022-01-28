import { Pixel } from "./pixel"

export type Prompt = {
  name: string;
  source: string;
}

export type Answer = {
  hash: string;
  length: number;
}

export type RevealedAnswer = Answer & {
  value: string;
}

export type Puzzle = {
  answer: Answer;
  pixels: Pixel[];
}

export type PuzzleSubmission = {
  answer: RevealedAnswer;
  pixels: Pixel[];
}

export const getPuzzleAnswer = async (answer: Answer): Promise<RevealedAnswer> => {
  // SELECT value FROM answer WHERE hash=answer.hash;
  return {
    ...answer,
    value: 'THE ANSWER TO THE PUZZLE'
  }
}