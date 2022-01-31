import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react';

import { Pixel, DrawingTitle, PALLET_INITIAL_COLOR, GameMode, Puzzle } from 'classes'
import { ContainerElement } from 'elements';
import { PuzzleHeaderComponent, DrawingComponent, PalletComponent, HeaderComponent } from 'components';

const PROMPT: DrawingTitle = {
  name: 'Jerry Smith',
  source: 'Rick and Morty'
}

const PUZZLE: Puzzle = {
  answer: {
    name: 'Louise',
    source: `Bob's Burgers`,
  },
  pixels: [[10, 6, "#ffc380"], [10, 4, "#ffc380"], [11, 6, "#333333"], [11, 4, "#333333"], [0, 7, "#ff008c"], [0, 5, "#ff008c"], [2, 6, "#ff008c"], [1, 7, "#ff008c"], [2, 7, "#ff008c"], [1, 5, "#ff008c"], [2, 5, "#ff008c"], [1, 5, "#ff80c6"], [2, 5, "#ff80c6"], [4, 6, "#ffc380"], [3, 6, "#ffc380"], [3, 5, "#ffc380"], [4, 5, "#ffc380"], [5, 5, "#008015"], [9, 8, "#ffffff"], [8, 7, "#ffffff"], [7, 7, "#ffffff"], [6, 7, "#ffffff"], [6, 7, "#008015"], [6, 6, "#008015"], [6, 5, "#008015"], [6, 4, "#008015"], [7, 7, "#008015"], [7, 6, "#008015"], [7, 5, "#008015"], [7, 4, "#008015"], [8, 7, "#008015"], [8, 6, "#008015"], [8, 5, "#008015"], [8, 4, "#008015"], [9, 8, "#008015"], [9, 7, "#008015"], [9, 6, "#008015"], [9, 5, "#008015"], [9, 4, "#008015"], [9, 3, "#008015"], [8, 6, "#ffffff"], [8, 7, "#ffffff"], [7, 7, "#ffffff"], [8, 7, "#ffffff"], [9, 7, "#ffffff"], [8, 7, "#ffffff"], [7, 6, "#ffffff"], [6, 6, "#ffffff"], [5, 6, "#ffffff"], [4, 6, "#ffffff"], [4, 5, "#ffffff"], [5, 5, "#ffffff"], [6, 5, "#ffffff"], [6, 4, "#ffffff"], [8, 4, "#ffffff"], [8, 3, "#ffffff"], [9, 3, "#ffffff"], [8, 3, "#ffffff"], [8, 4, "#ffffff"], [7, 4, "#ffffff"], [6, 4, "#ffffff"], [5, 4, "#ffffff"], [6, 4, "#ffffff"], [6, 3, "#ffffff"], [7, 3, "#ffffff"], [8, 3, "#ffffff"], [8, 4, "#ffffff"], [9, 4, "#ffffff"], [8, 4, "#ffffff"], [8, 5, "#ffffff"], [7, 5, "#ffffff"], [6, 5, "#ffffff"], [5, 5, "#ffffff"], [4, 5, "#ffffff"], [3, 5, "#ffffff"], [2, 5, "#ffffff"], [1, 5, "#ffffff"], [1, 6, "#ffffff"], [2, 6, "#ffffff"], [3, 6, "#ffffff"], [3, 5, "#ffffff"], [3, 4, "#ffffff"], [2, 4, "#ffffff"], [1, 4, "#ffffff"], [1, 6, "#ffc380"], [1, 5, "#ffc380"], [1, 4, "#ffc380"], [3, 6, "#ffc380"], [2, 6, "#ffc380"], [2, 5, "#ffc380"], [2, 4, "#ffc380"], [3, 4, "#ffc380"], [3, 5, "#ffc380"], [4, 5, "#008015"], [5, 6, "#008015"], [5, 5, "#008015"], [5, 4, "#008015"], [8, 7, "#008015"], [8, 6, "#008015"], [8, 5, "#008015"], [8, 4, "#008015"], [8, 3, "#008015"], [7, 6, "#008015"], [7, 5, "#008015"], [7, 4, "#008015"], [6, 6, "#008015"], [6, 5, "#008015"], [6, 4, "#008015"], [6, 5, "#008015"], [5, 5, "#008015"]]
}

const PageDaily: NextPage = () => {

  // Game
  const [gameMode, setGameMode] = useState<GameMode>('GUESS');

  // Guess
  const [puzzle, setPuzzle] = useState(PUZZLE);

  // Draw
  const [drawPrompt, setDrawPrompt] = useState(PROMPT);
  const [color, setColor] = useState(PALLET_INITIAL_COLOR);

  const handleSubmitGuess = (guess: string) => {
    console.log(guess);
  }

  return (
    <>
      <Head>
        <title>Pixionary: Daily</title>
        <meta name="description" content="A daily pixel picture puzzle" />
      </Head>
      <ContainerElement>
        <HeaderComponent />
        <PuzzleHeaderComponent
          mode={gameMode}
          drawPrompt={drawPrompt}
          puzzleAnswer={puzzle.answer}
        />
        <DrawingComponent
          mode={gameMode}
          color={color}
          pixels={gameMode === 'DRAW' ? [] : puzzle.pixels}
        // TODO: some function to get the pixels out of there?
        />
        {
          gameMode === 'DRAW' && <PalletComponent
            setColor={setColor}
            selectedColor={color}
          />
        }

      </ContainerElement>
    </>
  )
}

export default PageDaily;
