import moment from 'moment';

import { formatTime, getRandomFromArray } from "utils";
import { Pixel } from "../pixel"

// Constants -----------------------------------

export const MAX_GUESSES = 3;

// Types -----------------------------------

export enum DailyGamePhase {
  START,
  GUESS,
  REVEAL,
  STATS,
  DRAW,
  THANKS
}

export type DailyGameState = {
  day: string;
  phase: DailyGamePhase;
  score: null | DailyScore;
  puzzle: null | Puzzle;
  submission: null | DrawingSubmission;
}

export const INIT_DAILY_GAME_STATE = {
  day: '',
  phase: DailyGamePhase.START,
  score: null,
  puzzle: null,
  submission: null,

}

// Puzzle

export type Puzzle = {
  answer: DrawingTitle;
  pixels: Pixel[];
}

export type DailyScore = {
  guessCount: number;
  timeSeconds: number;
  // guess: string; // TODO: store the guess because we want to fill it in when they've already guessed
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

// Helper functions -----------------------------------

// Time

const getTimeInNewYork = (): moment.Moment => {
  return moment().utcOffset(-5);
}

const hasReleasedCrosswordToday = (): boolean => {
  const timeInNewYork = getTimeInNewYork();
  return timeInNewYork.get('hour') >= 22;
}

export const getPuzzleDay = (): string => {
  const timeInNewYork = getTimeInNewYork();
  if (hasReleasedCrosswordToday()) {
    timeInNewYork.add(1, 'day');
  }
  return timeInNewYork.format('YYYY-MM-DD');
}

// Score

export const didFail = (score?: DailyScore) => {
  if (score) {
    return score.guessCount > MAX_GUESSES;
  }
  return false;
}

// Share

export const getShareText = (score?: DailyScore) => {
  if (score) {
    const guessCount = didFail(score) ? 'X' : score.guessCount;
    return `Pixionary #12 ${getEmoji(score)} ${formatTime(score.timeSeconds)} - ${guessCount}/3`;
  }
  return 'https://pixionary.flanny.app';
}

// TODO: go through all the face and hand characters 

export const getEmoji = (score?: DailyScore, didDraw?: boolean): string => {
  const emojiList = `🕹🎮🎰🧩👾🤖💣`.split('');

  if (didFail(score)) {
    return getRandomFromArray(`🗑🚫⛔📛❌🏳🤬🦨🧟🎲📉🩹🛏🧯🚮🚷📵🆘🔻💩🤡💢🗯🍼🧂`.split(''));
  }

  emojiList.push(...(`🤙👌🥳🎉🎊🎇🎆✅🎓🏅🏆🎖🥅👑💎🥁💡📈🗝🔨🧼🆙🔺💯🌶🍾🔥`).split(''));

  // added multiple times so they can be favored in the random
  if (score.timeSeconds > 60 * 2.5) {
    emojiList.push(...(`🐢🐛🦥🥌💤⌛⏳`).split(''));
    emojiList.push(...(`🐢🐛🦥🥌💤⌛⏳`).split(''));
    emojiList.push(...(`🐢🐛🦥🥌💤⌛⏳`).split(''));
  }

  if (score.timeSeconds < 30) {
    emojiList.push(...(`🐆🏁🚴🚴🎽🩲🩳👟⚡`).split(''));
    emojiList.push(...(`🐆🏁🚴🚴🎽🩲🩳👟⚡`).split(''));
    emojiList.push(...(`🐆🏁🚴🚴🎽🩲🩳👟⚡`).split(''));
  }

  if (score.guessCount === 1) {
    emojiList.push(...(`📌📍🔑🔝1️⃣⛳🥇🎯🔮`).split(''));
    emojiList.push(...(`📌📍🔑🔝1️⃣⛳🥇🎯🔮`).split(''));
    emojiList.push(...(`📌📍🔑🔝1️⃣⛳🥇🎯🔮`).split(''));
  }

  if (score.guessCount === 2) {
    emojiList.push(...(`2️⃣🥈🆗`).split(''));
    emojiList.push(...(`2️⃣🥈🆗`).split(''));
    emojiList.push(...(`2️⃣🥈🆗`).split(''));
  }

  if (score.guessCount === 3) {
    // :last: :diamond: 
    emojiList.push(...(`3️⃣🥉`).split(''));
    emojiList.push(...(`3️⃣🥉`).split(''));
    emojiList.push(...(`3️⃣🥉`).split(''));
  }

  if (didDraw) {
    emojiList.push(...(`🦋🖌🖼🎨`).split(''));
  }

  return getRandomFromArray(emojiList);
}