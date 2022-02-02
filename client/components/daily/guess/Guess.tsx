
import { FC, useState } from 'react';

import { Puzzle } from 'model'
import { CanvasWatchElement } from 'elements';

import { DailyScore, GameMode } from '..';
import { GuessInput } from './guessInput';

const PUZZLE: Puzzle = {
  answer: {
    name: 'Louise',
    source: `Bob's Burgers`,
  },
  pixels: [[10, 6, "#ffc380"], [10, 4, "#ffc380"], [11, 6, "#333333"], [11, 4, "#333333"], [0, 7, "#ff008c"], [0, 5, "#ff008c"], [2, 6, "#ff008c"], [1, 7, "#ff008c"], [2, 7, "#ff008c"], [1, 5, "#ff008c"], [2, 5, "#ff008c"], [1, 5, "#ff80c6"], [2, 5, "#ff80c6"], [4, 6, "#ffc380"], [3, 6, "#ffc380"], [3, 5, "#ffc380"], [4, 5, "#ffc380"], [5, 5, "#008015"], [9, 8, "#ffffff"], [8, 7, "#ffffff"], [7, 7, "#ffffff"], [6, 7, "#ffffff"], [6, 7, "#008015"], [6, 6, "#008015"], [6, 5, "#008015"], [6, 4, "#008015"], [7, 7, "#008015"], [7, 6, "#008015"], [7, 5, "#008015"], [7, 4, "#008015"], [8, 7, "#008015"], [8, 6, "#008015"], [8, 5, "#008015"], [8, 4, "#008015"], [9, 8, "#008015"], [9, 7, "#008015"], [9, 6, "#008015"], [9, 5, "#008015"], [9, 4, "#008015"], [9, 3, "#008015"], [8, 6, "#ffffff"], [8, 7, "#ffffff"], [7, 7, "#ffffff"], [8, 7, "#ffffff"], [9, 7, "#ffffff"], [8, 7, "#ffffff"], [7, 6, "#ffffff"], [6, 6, "#ffffff"], [5, 6, "#ffffff"], [4, 6, "#ffffff"], [4, 5, "#ffffff"], [5, 5, "#ffffff"], [6, 5, "#ffffff"], [6, 4, "#ffffff"], [8, 4, "#ffffff"], [8, 3, "#ffffff"], [9, 3, "#ffffff"], [8, 3, "#ffffff"], [8, 4, "#ffffff"], [7, 4, "#ffffff"], [6, 4, "#ffffff"], [5, 4, "#ffffff"], [6, 4, "#ffffff"], [6, 3, "#ffffff"], [7, 3, "#ffffff"], [8, 3, "#ffffff"], [8, 4, "#ffffff"], [9, 4, "#ffffff"], [8, 4, "#ffffff"], [8, 5, "#ffffff"], [7, 5, "#ffffff"], [6, 5, "#ffffff"], [5, 5, "#ffffff"], [4, 5, "#ffffff"], [3, 5, "#ffffff"], [2, 5, "#ffffff"], [1, 5, "#ffffff"], [1, 6, "#ffffff"], [2, 6, "#ffffff"], [3, 6, "#ffffff"], [3, 5, "#ffffff"], [3, 4, "#ffffff"], [2, 4, "#ffffff"], [1, 4, "#ffffff"], [1, 6, "#ffc380"], [1, 5, "#ffc380"], [1, 4, "#ffc380"], [3, 6, "#ffc380"], [2, 6, "#ffc380"], [2, 5, "#ffc380"], [2, 4, "#ffc380"], [3, 4, "#ffc380"], [3, 5, "#ffc380"], [4, 5, "#008015"], [5, 6, "#008015"], [5, 5, "#008015"], [5, 4, "#008015"], [8, 7, "#008015"], [8, 6, "#008015"], [8, 5, "#008015"], [8, 4, "#008015"], [8, 3, "#008015"], [7, 6, "#008015"], [7, 5, "#008015"], [7, 4, "#008015"], [6, 6, "#008015"], [6, 5, "#008015"], [6, 4, "#008015"], [6, 5, "#008015"], [5, 5, "#008015"]]
}

type GuessComponentProps = {
  gameMode: GameMode;
  onSubmit: (newScore: DailyScore) => void;
}

const GuessComponent: FC<GuessComponentProps> = ({
  gameMode,
  onSubmit
}) => {
  // TODO: onload get the puzzle from backend and set it
  // if the puzzle has been loaded for today, don't reload it
  const [puzzle, setPuzzle] = useState(PUZZLE);

  const titleVisible = (() => {
    switch (gameMode) {
      case GameMode.REVEAL:
      case GameMode.STATS:
      case GameMode.THANKS:
        return true;
    }
    return false;
  })();

  const inputVisible = (() => {
    switch (gameMode) {
      case GameMode.GUESS:
      case GameMode.REVEAL:
        return true;
    }
    return false;
  })();

  return (
    <>
      <CanvasWatchElement
        pixels={puzzle.pixels}
        isPlaying={gameMode !== GameMode.START}
        titleVisible={titleVisible}
        title={puzzle.answer}
      />
      {
        inputVisible && <GuessInput
          correctWord={puzzle.answer.name || ''}
          onSubmit={onSubmit}
        />
      }
    </>
  )
}

export { GuessComponent };
