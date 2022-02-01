
import { FC, useState } from 'react';

import { GameMode } from 'classes'
import { ContainerElement, HeaderElement, PromptElement } from 'elements';

import { DrawComponent } from './draw';
import { GuessComponent } from './guess';
import { useEffectOnce } from 'react-use';

const START_PROMPTS = [
  'Are you ready?',
  'Ready to play?',
];

const GUESS_PROMPTS = [
  'Who is this?',
  'Do you know who this is?',
  'Who is in the pixture?'
];

const DRAW_PROMPTS = [
  'Can you draw?',
  `Let's draw!`,
  'Paint _, like one of your pixelated French girls'
];

const REVEAL_CORRECT_PROMPT = [
  'Right on! It was:',
  'You got it!'
]

const REVEAL_INCORRECT_PROMPT = [
  `Sorry 'bout it. The picture was:`,
  `Sorry sport, it was:`
];

const getRandomFromArray = (phrases: string[]): string => {
  return phrases[Math.floor(Math.random() * phrases.length)];
}

export type CycleGameModeProps = {
  isGuessCorrect?: boolean;
}

const DailyComponent: FC = () => {

  const [gameMode, setGameMode] = useState<GameMode>('START');
  const [prompt, setPrompt] = useState({
    text: '',
    color: undefined
  });

  useEffectOnce(() => {
    setPrompt({
      text: getRandomFromArray(START_PROMPTS),
      color: undefined
    });
  })

  const cycleGameMode = (nextGameMode: GameMode, props: CycleGameModeProps = {}) => {
    switch (nextGameMode) {
      case 'GUESS':
        setPrompt({
          text: getRandomFromArray(GUESS_PROMPTS),
          color: undefined
        });
        break;
      case 'REVEAL':
        setPrompt({
          text: (props.isGuessCorrect) ? getRandomFromArray(REVEAL_CORRECT_PROMPT) : getRandomFromArray(REVEAL_INCORRECT_PROMPT),
          color: (props.isGuessCorrect) ? 'green' : 'red',
        });
        break;
      case 'DRAW':
        setPrompt({
          text: getRandomFromArray(DRAW_PROMPTS),
          color: undefined
        });
        break;
    }
    setGameMode(nextGameMode);
  }


  return (
    <ContainerElement>
      <HeaderElement />
      <PromptElement
        color={prompt.color}
        text={prompt.text}
      />
      {
        gameMode === 'DRAW' && <DrawComponent />
      }
      {
        gameMode !== 'DRAW' && <GuessComponent gameMode={gameMode} cycleGameMode={cycleGameMode} />
      }
    </ContainerElement>
  )
}

export { DailyComponent };
