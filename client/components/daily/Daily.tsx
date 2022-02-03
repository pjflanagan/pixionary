
import { FC, useEffect, useState } from 'react';

import { ContainerElement, HeaderElement, NotificationElement, useNotification } from 'elements';

import { DrawComponent } from './draw';
import { GuessComponent } from './guess';
import { useCopyToClipboard } from 'react-use';
import { ButtonRowComponent } from './ButtonRow';
import { PromptComponent } from './Prompt';
import { PopupComponent } from './Popup';

export enum GameMode {
  START,
  GUESS,
  REVEAL,
  STATS,
  DRAW,
  THANKS
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
    // TODO: move this to models/daily.ts and utils/index.ts
    copyToClipboard(`Pixionary #12 - ${score.timeSeconds} - ${score.guessCount + 1}/3`);
    sendNotification('Copied score to clipboard');
  }

  return (
    <>
      <PopupComponent
        gameMode={gameMode}
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        cycleGameMode={cycleGameMode}
        score={score}
        onShare={handleShare}
      />
      <NotificationElement isOpen={isOpen} text={message} />
      <ContainerElement>
        {/* TODO: the header should take an actions */}
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
