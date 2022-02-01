
import { FC, useState } from 'react';

import { ButtonElement, ButtonRowElement, ContainerElement, HeaderElement, NotificationElement, PromptElement, useNotification } from 'elements';

import { DrawComponent } from './draw';
import { GuessComponent } from './guess';
import { useCopyToClipboard, useEffectOnce } from 'react-use';

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
  'Time to paint'
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

export enum GameMode {
  START,
  GUESS,
  REVEAL,
  DRAW,
  THANKS
}

const DailyComponent: FC = () => {

  // TODO: store game state in the storage with the loaded drawings
  // determine if it is a new day and we need to update the game state
  // const [value, setValue, remove] = useLocalStorage('daily--gameMode', 'foo');
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.START);
  const [_state, copyToClipboard] = useCopyToClipboard();
  const [isOpen, message, sendNotification] = useNotification();

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
      case GameMode.GUESS:
        setPrompt({
          text: getRandomFromArray(GUESS_PROMPTS),
          color: undefined
        });
        break;
      case GameMode.REVEAL:
        setPrompt({
          text: (props.isGuessCorrect) ? getRandomFromArray(REVEAL_CORRECT_PROMPT) : getRandomFromArray(REVEAL_INCORRECT_PROMPT),
          color: (props.isGuessCorrect) ? 'green' : 'red',
        });
        break;
      case GameMode.DRAW:
        setPrompt({
          text: getRandomFromArray(DRAW_PROMPTS),
          color: undefined
        });
        break;
      case GameMode.THANKS:
        setPrompt({
          text: `Thanks for playing! See you tomorrow!`,
          color: undefined
        });
    }
    setGameMode(nextGameMode);
  }

  const handleShare = () => {
    copyToClipboard('Pixionary #12 - 1:28');
    sendNotification('Copied score to clipboard');
  }

  const renderButtonRow = () => {
    switch (gameMode) {
      case GameMode.START:
        return (
          <ButtonRowElement>
            <ButtonElement label="Start" onClick={() => cycleGameMode(GameMode.GUESS)} type="primary" />
          </ButtonRowElement>
        );
      case GameMode.REVEAL:
        return (
          <ButtonRowElement>
            <ButtonElement label="Share" onClick={handleShare} type="secondary" />
            <ButtonElement label="Continue" onClick={() => cycleGameMode(GameMode.DRAW)} type="primary" />
          </ButtonRowElement>
        );
      case GameMode.THANKS:
        return (
          <ButtonRowElement>
            <ButtonElement label="Share" onClick={handleShare} type="secondary" />
          </ButtonRowElement>
        );
    }
    return null;
  }

  return (
    <>
      <NotificationElement isOpen={isOpen} text={message} />
      <ContainerElement>
        <HeaderElement />
        <PromptElement
          color={prompt.color}
          text={prompt.text}
        />
        {
          gameMode === GameMode.DRAW && <DrawComponent cycleGameMode={cycleGameMode} />
        }
        {
          gameMode !== GameMode.DRAW && <GuessComponent gameMode={gameMode} cycleGameMode={cycleGameMode} />
        }
        {
          renderButtonRow()
        }
      </ContainerElement>
    </>
  )
}

export { DailyComponent };
