
import { FC, useEffect, useState } from 'react';
import { useCopyToClipboard, useEffectOnce, useLocalStorage } from 'react-use';

import { ContainerElement, HeaderElement, NotificationElement, useNotification } from 'elements';
import { DailyScore, GameMode, getPuzzleDay, getShareText } from 'models';

import { ButtonRowComponent } from './ButtonRow';
import { PromptComponent } from './Prompt';
import { DrawComponent } from './draw';
import { GuessComponent } from './guess';
import { PopupComponent } from './popup';

const DailyComponent: FC = () => {

  // Data and State
  // TODO: store game state in the storage with the loaded drawings
  // determine if it is a new day and we need to update the game state
  // TODO: also do I need a GameMode.LOADING?
  const [puzzleDay, setPuzzleDay] = useLocalStorage('pix-daily--puzzleDay');
  const [gameMode, setGameMode] = useLocalStorage<GameMode>('pix-daily--gameMode', GameMode.START);
  const [score, setScore, _removeScore] = useLocalStorage<DailyScore>('pix-daily--score', null);

  // UI
  const [isOpen, message, sendNotification] = useNotification();
  const [popupState, setPopupState] = useState<'info' | 'settings' | 'stats' | 'none' >('info');

  // Actions
  const [_state, copyToClipboard] = useCopyToClipboard();

  // 
  useEffectOnce(() => {
    // if it's a new day, then reset
    const newPuzzleDay = getPuzzleDay();
    // if (puzzleDay !== newPuzzleDay) {
    //   setPuzzleDay(newPuzzleDay);
    //   setGameMode(GameMode.START);
    //   setScore(null);
    // }
  });

  // after the score changes, cycle the game mode
  useEffect(() => {
    if (score !== null) {
      cycleGameMode(GameMode.REVEAL);
    }
  }, [score]);

  const cycleGameMode = (nextGameMode: GameMode) => {
    switch (nextGameMode) {
      case GameMode.GUESS: // -------------- 1. GUESS
      setPopupState('none');
        break;
      case GameMode.REVEAL: // ------------- 2. REVEAL
        setTimeout(() => {
          setPopupState('info');
          setGameMode(GameMode.STATS);
        }, 2600);
        break;
      case GameMode.STATS: // -------------- 3. STATS
        break;
      case GameMode.DRAW: // --------------- 4. DRAW
        setPopupState('none');
        break;
      case GameMode.THANKS: // ------------- 5. THANKS
        setPopupState('info');
        break;
    }
    setGameMode(nextGameMode);
  }


  const handleShare = () => {
    copyToClipboard(getShareText(score));
    sendNotification('Copied score to clipboard');
  }

  return (
    <>
      <PopupComponent
        popupState={popupState}
        gameMode={gameMode}
        onClose={() => setPopupState('none')}
        cycleGameMode={cycleGameMode}
        score={score}
        onShare={handleShare}
      />
      <NotificationElement isOpen={isOpen} text={message} />
      <ContainerElement>
        <HeaderElement actions={[
          { icon: 'info', onClick: () => setPopupState('info') },
          { icon: 'stats', onClick: () => setPopupState('stats') },
          { icon: 'settings', onClick: () => setPopupState('settings') },
        ]} />
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
            isVisible={popupState !== 'none'}
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
