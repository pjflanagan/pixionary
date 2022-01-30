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

export type Puzzle = {
  answer: DrawingTitle;
  pixels: Pixel[];
}
