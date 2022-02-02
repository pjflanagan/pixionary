
import { FC, useState } from 'react';

import { ButtonElementProps, PopupElement } from 'elements';

import { DailyScore, GameMode } from '.';

type PopupComponentProps = {
  gameMode: GameMode,
  cycleGameMode: (gameMode: GameMode) => void;
  score: DailyScore;
  onShare: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const PopupComponent: FC<PopupComponentProps> = ({
  gameMode,
  cycleGameMode,
  score,
  onShare,
  isOpen,
  onClose,
}) => {

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
          onClick: onShare,
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
        <p>{`In the next round, you'll be given a character to draw, which might be used as a puzzle in the future.`}</p>
        <p>Are you ready?</p>
      </>;
      break;
    case GameMode.THANKS:
      popupTitle = 'Thanks';
      popupActions.push({
        label: 'Share',
        onClick: onShare,
        type: 'secondary',
      });
      popupContent = <>
        <p>{`Thank's for playing`}</p>
        <p>{`Come back each day to play again, maybe your drawing will be tomorrow's puzzle!`}</p>
        <p>{`And be sure to share your score if you did well!`}</p>
      </>;
      break;
  }



  return (
    <PopupElement isOpen={isOpen} title={popupTitle} actions={popupActions} onClose={onClose}>
      {popupContent}
    </PopupElement>
  )
}

export { PopupComponent };
