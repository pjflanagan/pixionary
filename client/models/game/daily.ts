import { formatTime, getRandomFromArray } from "utils";
import { Pixel } from "../pixel"

export const MAX_GUESSES = 3;

export enum GameMode {
  START,
  GUESS,
  REVEAL,
  STATS,
  DRAW,
  THANKS
}

// Puzzle

export type Puzzle = {
  answer: DrawingTitle;
  pixels: Pixel[];
}

export type DailyScore = {
  guessCount: number;
  timeSeconds: number;
}

// Drawing
export type DrawingTitle = {
  name: string;
  source: string;
}

export type DrawingSubmission = {
  title: DrawingTitle;
  pixels: Pixel[];
}

// Helper functions

export const didFail = (score?: DailyScore) => {
  if (score) {
    return score.guessCount > MAX_GUESSES;
  }
  return false;
}

export const getShareText = (score?: DailyScore) => {
  if (score) {
    const guessCount = didFail(score) ? 'X' : score.guessCount;
    return `Pixionary #12 ${getEmoji(score)} ${formatTime(score.timeSeconds)} - ${guessCount}/3`;
  }
  return 'https://pixionary.flanny.app';
}

export const getEmoji = (score?: DailyScore): string => {
  const emojiList = `🕹🎮🎰🧩👾🤖💣`.split('');

  if (didFail(score)) {
    return getRandomFromArray(`🗑🚫⛔📛❌🏳🤬🦨🧟🎲📉🩹🛏🧯🚮🚷📵🆘🔻💩🤡💢🗯🍼🧂`.split(''));
  }

  return getRandomFromArray(emojiList);
}