
import { FC, useState } from 'react';
import { useCopyToClipboard } from 'react-use';

import { GameMode, Puzzle } from 'classes'
import { ButtonElement, ButtonRowElement, GuessInput, CanvasWatchElement } from 'elements';
import { CycleGameModeProps } from '..';

const PUZZLE: Puzzle = {
  answer: {
    name: 'Louise',
    source: `Bob's Burgers`,
  },
  pixels: [[10, 6, "#ffc380"], [10, 4, "#ffc380"], [11, 6, "#333333"], [11, 4, "#333333"], [0, 7, "#ff008c"], [0, 5, "#ff008c"], [2, 6, "#ff008c"], [1, 7, "#ff008c"], [2, 7, "#ff008c"], [1, 5, "#ff008c"], [2, 5, "#ff008c"], [1, 5, "#ff80c6"], [2, 5, "#ff80c6"], [4, 6, "#ffc380"], [3, 6, "#ffc380"], [3, 5, "#ffc380"], [4, 5, "#ffc380"], [5, 5, "#008015"], [9, 8, "#ffffff"], [8, 7, "#ffffff"], [7, 7, "#ffffff"], [6, 7, "#ffffff"], [6, 7, "#008015"], [6, 6, "#008015"], [6, 5, "#008015"], [6, 4, "#008015"], [7, 7, "#008015"], [7, 6, "#008015"], [7, 5, "#008015"], [7, 4, "#008015"], [8, 7, "#008015"], [8, 6, "#008015"], [8, 5, "#008015"], [8, 4, "#008015"], [9, 8, "#008015"], [9, 7, "#008015"], [9, 6, "#008015"], [9, 5, "#008015"], [9, 4, "#008015"], [9, 3, "#008015"], [8, 6, "#ffffff"], [8, 7, "#ffffff"], [7, 7, "#ffffff"], [8, 7, "#ffffff"], [9, 7, "#ffffff"], [8, 7, "#ffffff"], [7, 6, "#ffffff"], [6, 6, "#ffffff"], [5, 6, "#ffffff"], [4, 6, "#ffffff"], [4, 5, "#ffffff"], [5, 5, "#ffffff"], [6, 5, "#ffffff"], [6, 4, "#ffffff"], [8, 4, "#ffffff"], [8, 3, "#ffffff"], [9, 3, "#ffffff"], [8, 3, "#ffffff"], [8, 4, "#ffffff"], [7, 4, "#ffffff"], [6, 4, "#ffffff"], [5, 4, "#ffffff"], [6, 4, "#ffffff"], [6, 3, "#ffffff"], [7, 3, "#ffffff"], [8, 3, "#ffffff"], [8, 4, "#ffffff"], [9, 4, "#ffffff"], [8, 4, "#ffffff"], [8, 5, "#ffffff"], [7, 5, "#ffffff"], [6, 5, "#ffffff"], [5, 5, "#ffffff"], [4, 5, "#ffffff"], [3, 5, "#ffffff"], [2, 5, "#ffffff"], [1, 5, "#ffffff"], [1, 6, "#ffffff"], [2, 6, "#ffffff"], [3, 6, "#ffffff"], [3, 5, "#ffffff"], [3, 4, "#ffffff"], [2, 4, "#ffffff"], [1, 4, "#ffffff"], [1, 6, "#ffc380"], [1, 5, "#ffc380"], [1, 4, "#ffc380"], [3, 6, "#ffc380"], [2, 6, "#ffc380"], [2, 5, "#ffc380"], [2, 4, "#ffc380"], [3, 4, "#ffc380"], [3, 5, "#ffc380"], [4, 5, "#008015"], [5, 6, "#008015"], [5, 5, "#008015"], [5, 4, "#008015"], [8, 7, "#008015"], [8, 6, "#008015"], [8, 5, "#008015"], [8, 4, "#008015"], [8, 3, "#008015"], [7, 6, "#008015"], [7, 5, "#008015"], [7, 4, "#008015"], [6, 6, "#008015"], [6, 5, "#008015"], [6, 4, "#008015"], [6, 5, "#008015"], [5, 5, "#008015"]]
}

type GuessComponentProps = {
  gameMode: GameMode;
  cycleGameMode: (newGameMode: GameMode, props?: CycleGameModeProps) => void;
}

const GuessComponent: FC<GuessComponentProps> = ({
  gameMode,
  cycleGameMode
}) => {
  const [_state, copyToClipboard] = useCopyToClipboard();

  // TODO: onload get the puzzle from backend and set it
  const [puzzle, setPuzzle] = useState(PUZZLE);

  const handleSubmitCorrectGuess = () => {
    cycleGameMode('REVEAL', { isGuessCorrect: true });
  }

  const handleSubmitIncorrectGuess = () => {
    cycleGameMode('REVEAL', { isGuessCorrect: false });
  }

  return (
    <>
      <CanvasWatchElement
        pixels={puzzle.pixels}
        isPlaying={gameMode === 'GUESS' || gameMode === 'REVEAL'}
        titleVisible={gameMode === 'REVEAL'}
        title={puzzle.answer}
      />
      {/* TODO: these might look better in one render function */}
      {
        gameMode === 'START' && <ButtonRowElement>
          <ButtonElement label="Start" onClick={() => cycleGameMode('GUESS')} type="primary" />
        </ButtonRowElement>
      }
      {
        gameMode === 'GUESS' && <GuessInput
          correctWord={puzzle.answer.name || ''}
          onCorrect={handleSubmitCorrectGuess}
          onIncorrect={handleSubmitIncorrectGuess}
        />
      }
      {
        gameMode === 'REVEAL' && <ButtonRowElement>
          <ButtonElement label="Share" onClick={() => copyToClipboard('Pixionary #12 - 1:28')} type="secondary" />
          <ButtonElement label="Continue" onClick={() => cycleGameMode('DRAW')} type="primary" />
        </ButtonRowElement>
      }
    </>
  )
}

export { GuessComponent };
