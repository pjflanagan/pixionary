
import { FC, useCallback, useEffect, useState } from 'react';
import { useCopyToClipboard, useEffectOnce, useLocalStorage } from 'react-use';

import { ContainerElement, HeaderElement, NotificationElement, useNotification } from 'elements';
import { DailyGamePhase, DailyGameState, DailyScore, getPuzzleDay, getShareText, INIT_DAILY_GAME_STATE } from 'models';

import { ButtonRowComponent } from './ButtonRow';
import { PromptComponent } from './Prompt';
import { DrawComponent } from './draw';
import { GuessComponent } from './guess';
import { PopupComponent } from './popup';

const DailyComponent: FC = () => {

  // Data and State
  // TODO: also do I need a DailyGamePhase.LOADING?
  const [gameState, setGameState, _removeGameState] = useLocalStorage<DailyGameState>('pix--dailyGameState', INIT_DAILY_GAME_STATE);

  const setScore = (newScore: DailyScore) => {
    setGameState({ ...gameState, score: newScore });
  }

  // UI
  const [isOpen, message, sendNotification] = useNotification();
  const [popupState, setPopupState] = useState<'info' | 'settings' | 'stats' | 'none'>('info');

  // Actions
  const [_state, copyToClipboard] = useCopyToClipboard();

  useEffectOnce(() => {
    // if it's a new day, then reset
    const newPuzzleDay = getPuzzleDay();
    if (gameState.day !== newPuzzleDay) {
      setGameState({
        day: newPuzzleDay,
        phase: DailyGamePhase.START,
        score: null,
        puzzle: null,
        submission: null
      });
    } else {
      // otherwise rerun any side effects of changing the game phase
      cycleGamePhase(gameState.phase);
    }
  });

  const cycleGamePhase = useCallback(
    (nextDailyGamePhase: DailyGamePhase) => {
      switch (nextDailyGamePhase) {
        case DailyGamePhase.GUESS: // -------------- 1. GUESS
          setPopupState('none');
          break;
        case DailyGamePhase.REVEAL: // ------------- 2. REVEAL
          setTimeout(() => {
            setPopupState('info');
            setGameState({ ...gameState, phase: DailyGamePhase.STATS });
          }, 2600);
          break;
        case DailyGamePhase.STATS: // -------------- 3. STATS
          break;
        case DailyGamePhase.DRAW: // --------------- 4. DRAW
          setPopupState('none');
          break;
        case DailyGamePhase.THANKS: // ------------- 5. THANKS
          setPopupState('info');
          break;
      }
      setGameState({ ...gameState, phase: nextDailyGamePhase });
    }, [gameState, setGameState]
  );

  // after the score changes, cycle the game mode
  useEffect(() => {
    if (gameState.score !== null && gameState.phase === DailyGamePhase.GUESS) {
      cycleGamePhase(DailyGamePhase.REVEAL);
    }
  }, [gameState, cycleGamePhase]);


  const handleShare = () => {
    copyToClipboard(getShareText(gameState.score));
    sendNotification('Copied score to clipboard');
  }

  return (
    <>
      <PopupComponent
        popupState={popupState}
        gamePhase={gameState.phase}
        onClose={() => setPopupState('none')}
        cycleGamePhase={cycleGamePhase}
        score={gameState.score}
        onShare={handleShare}
      />
      <NotificationElement isOpen={isOpen} text={message} />
      <ContainerElement>
        <HeaderElement actions={[
          { icon: 'info', onClick: () => setPopupState('info') },
          { icon: 'stats', onClick: () => setPopupState('stats') },
          { icon: 'settings', onClick: () => setPopupState('settings') },
        ]} />
        <PromptComponent gamePhase={gameState.phase} score={gameState.score} />
        {
          gameState.phase === DailyGamePhase.DRAW && <DrawComponent cycleGamePhase={cycleGamePhase} />
        }
        {
          gameState.phase !== DailyGamePhase.DRAW && <GuessComponent
            gamePhase={gameState.phase}
            onSubmit={setScore}
          />
        }
        {
          <ButtonRowComponent
            isVisible={popupState !== 'none'}
            gamePhase={gameState.phase}
            handleShare={handleShare}
            cycleGamePhase={cycleGamePhase}
          />
        }
      </ContainerElement>
    </>
  )
}

export { DailyComponent };
