
import { FC, useEffect, useState } from 'react';

import { ButtonElement, ButtonElementProps, ButtonRowElement, ContainerElement, HeaderElement, NotificationElement, PopupElement, PromptElement, useNotification } from 'elements';

import { DrawComponent } from './draw';
import { GuessComponent } from './guess';
import { useCopyToClipboard, useEffectOnce } from 'react-use';
import { ButtonRowComponent } from './ButtonRow';
import { PromptComponent } from './Prompt';

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

export enum GameMode {
  START,
  GUESS,
  REVEAL,
  STATS,
  DRAW,
  THANKS // TODO: THANKS_GUESS_ONLY, THANKS_DRAW
}

export type DailyScore = {
  guessCount: number;
  timeSeconds: number;
}

export const MAX_GUESSES = 3;

// TODO: TODO: TODO: TODO: move to a models/daily.ts
export const didFail = (score?: DailyScore) => {
  if (score) {
    return score.guessCount === MAX_GUESSES;
  }
  return false;
}

const DailyComponent: FC = () => {

  // TODO: store game state in the storage with the loaded drawings
  // determine if it is a new day and we need to update the game state
  // const [value, setValue, remove] = useLocalStorage('daily--gameMode', 'foo');

  // Data and State
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.START);
  const [score, setScore] = useState<DailyScore>(null);

  // UI
  const [isOpen, message, sendNotification] = useNotification();
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  // Actions
  const [_state, copyToClipboard] = useCopyToClipboard();

  // after the score changes, cycle the game mode
  useEffect(() => {
    if (score !== null) {
      cycleGameMode(GameMode.REVEAL);
    }
  }, [score]);

  const cycleGameMode = (nextGameMode: GameMode) => {
    switch (nextGameMode) {
      case GameMode.GUESS: // -------------- 1. GUESS
        setIsPopupOpen(false);
        break;
      case GameMode.REVEAL: // -------------- 2. REVEAL
        setTimeout(() => {
          setIsPopupOpen(true);
          setGameMode(GameMode.STATS);
        }, 2600);
        break;
      case GameMode.STATS: // -------------- 3. STATS
        break;
      case GameMode.DRAW: // -------------- 4. DRAW
        setIsPopupOpen(false);
        break;
      case GameMode.THANKS: // -------------- 5. THANKS
        setIsPopupOpen(true);
        break;
    }
    setGameMode(nextGameMode);
  }


  const handleShare = () => {
    // TODO: move this to utils/index.ts
    copyToClipboard(`Pixionary #12 - ${score.timeSeconds} - ${score.guessCount + 1}/3`);
    sendNotification('Copied score to clipboard');
  }

  // TODO: this needs to be moved out to ./PopupComponent.tsx
  const renderPopup = () => {
    const popupActions: ButtonElementProps[] = [];
    let popupTitle = 'Welcome';
    let popupContent = <></>;

    switch (gameMode) {
      case GameMode.START:
        popupActions.push({
          label: 'Start',
          onClick: () => cycleGameMode(GameMode.GUESS),
          type: 'primary',
        });
        popupContent = <>
          <p>Pixionary is a pop culture drawing game with pixels.</p>
          <p>First, guess the character being drawn. The faster you guess, the better your score! But watch out, you only get 3 chances.</p>
          <p>Are you ready?</p>
        </>;
        break;
      case GameMode.STATS:
        popupTitle = 'Stats';
        popupActions.push(
          {
            label: 'Share',
            onClick: handleShare,
            type: 'secondary',
          },
          {
            label: 'Continue',
            onClick: () => cycleGameMode(GameMode.DRAW),
            type: 'primary',
          }
        );
        popupContent = <>
          <p><b>You got it in {score.guessCount + 1} guesses and took {score.timeSeconds} seconds.</b></p>
          <p>In the next round, you'll be given a character to draw, which might be used as a puzzle in the future.</p>
          <p>Are you ready?</p>
        </>;
        break;
      case GameMode.THANKS:
        popupTitle = 'Thanks';
        popupActions.push({
          label: 'Share',
          onClick: handleShare,
          type: 'secondary',
        });
        break;
    }
    return (
      <PopupElement isOpen={isPopupOpen} title={popupTitle} actions={popupActions} onClose={() => setIsPopupOpen(false)}>
        {popupContent}
      </PopupElement>
    )
  }

  return (
    <>
      {renderPopup()}
      <NotificationElement isOpen={isOpen} text={message} />
      <ContainerElement>
        <HeaderElement />
        <PromptComponent gameMode={gameMode} score={score} />
        {
          gameMode === GameMode.DRAW && <DrawComponent cycleGameMode={cycleGameMode} />
        }
        {
          gameMode !== GameMode.DRAW && <GuessComponent
            gameMode={gameMode}
            onSubmit={setScore}
          />
        }
        {
          <ButtonRowComponent
            isVisible={isPopupOpen}
            gameMode={gameMode}
            handleShare={handleShare}
            cycleGameMode={cycleGameMode}
          />
        }
      </ContainerElement>
    </>
  )
}

export { DailyComponent };
