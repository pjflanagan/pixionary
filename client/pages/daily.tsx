import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react';
import { useCopyToClipboard } from 'react-use';

import { DrawingTitle, PALLET_INITIAL_COLOR, GameMode, Puzzle, Pixel } from 'classes'
import { ButtonElement, ButtonRowElement, ContainerElement } from 'elements';
import { PalletComponent, HeaderComponent, GuessInput, PromptComponent, CanvasDrawComponent, CanvasWatchComponent } from 'components';

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

  // TODO: a start button somewhere, the prompt should "Are you ready?"

  // Game
  const [gameMode, setGameMode] = useState<GameMode>('START');
  const [prompt, setPrompt] = useState({
    text: 'Are you ready?',
    color: undefined
  });
  const [_state, copyToClipboard] = useCopyToClipboard();

  // Guess
  const [puzzle, setPuzzle] = useState(PUZZLE);

  // Draw
  const [drawPrompt, setDrawPrompt] = useState(PROMPT);
  const [drawPixels, setDrawPixels] = useState<Pixel[]>([]);
  const [color, setColor] = useState(PALLET_INITIAL_COLOR);

  const cycleGameMode = (nextGameMode: GameMode) => {
    switch (nextGameMode) {
      case 'GUESS':
        setPrompt({
          text: 'Who is this?',
          color: undefined
        });
        break;
      case 'REVEAL':
        setPrompt({
          text: 'It was:',
          color: undefined
        });
        break;
      case 'DRAW':
        setPrompt({
          text: `Let's draw:`,
          color: undefined
        });
        break;
    }
    setGameMode(nextGameMode);
  }

  const handleSubmitGuess = () => {
    cycleGameMode('REVEAL');
  }

  const drawingTitle = (gameMode === 'DRAW') ? drawPrompt : puzzle.answer;

  return (
    <>
      <Head>
        <title>Pixionary: Daily</title>
        <meta name="description" content="A daily pixel picture puzzle" />
      </Head>
      <ContainerElement>
        <HeaderComponent />
        <PromptComponent
          color={prompt.color}
          text={prompt.text}
        />
        {/* TODO: maybe all of these should be wrapped in a DailyGame component, and broken down into functions renderGuess() */}
        {
          gameMode === 'DRAW' && <CanvasDrawComponent
            color={color}
            pixels={drawPixels}
            setPixels={setDrawPixels}
            title={drawingTitle}
          />
        }
        {
          gameMode !== 'DRAW' && <CanvasWatchComponent
            pixels={puzzle.pixels}
            isPlaying={gameMode === 'GUESS' || gameMode === 'REVEAL'}
            titleVisible={gameMode === 'REVEAL'}
            title={drawingTitle}
          />
        }
        {
          gameMode === 'START' && <ButtonRowElement>
            <ButtonElement label="Start" onClick={() => cycleGameMode('GUESS')} type="primary" />
          </ButtonRowElement>
        }
        {
          gameMode === 'GUESS' && <GuessInput
            correctWord={puzzle.answer.name || ''}
            onCorrect={handleSubmitGuess}
          />
        }
        {
          gameMode === 'REVEAL' && <ButtonRowElement>
            <ButtonElement label="Share" onClick={() => copyToClipboard('Pixionary #12 - 1:28')} type="secondary" />
            <ButtonElement label="Continue" onClick={() => cycleGameMode('DRAW')} type="primary" />
          </ButtonRowElement>
        }
        {
          gameMode === 'DRAW' && <>
            <PalletComponent
              setColor={setColor}
              selectedColor={color}
            />
            <ButtonRowElement>
              <ButtonElement label="Restart" onClick={() => setDrawPixels([])} />
              {/* TODO: open a popup that asks to confirm, with a share dialogue */}
              <ButtonElement label="Submit" onClick={() => console.log('submit')} type="primary" />
            </ButtonRowElement>
          </>
        }

      </ContainerElement>
    </>
  )
}

export default PageDaily;
