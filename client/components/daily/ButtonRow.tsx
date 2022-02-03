
import { FC } from 'react';

import { ButtonElement, ButtonRowElement } from 'elements';
import { GameMode } from 'models';

type ButtonRowComponentProps = {
  isVisible: boolean;
  gameMode: GameMode;
  cycleGameMode: (gameMode: GameMode) => void;
  handleShare: () => void;
}

const ButtonRowComponent: FC<ButtonRowComponentProps> = ({
  isVisible,
  gameMode,
  cycleGameMode,
  handleShare
}) => {

  const renderButtonRow = () => {
    if (isVisible) {
      return null;
    }
    switch (gameMode) {
      case GameMode.START:
        return (
          <ButtonRowElement>
            <ButtonElement label="Start" onClick={() => cycleGameMode(GameMode.GUESS)} type="primary" />
          </ButtonRowElement>
        );
      case GameMode.STATS:
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
      {renderButtonRow()}
    </>
  )
}

export { ButtonRowComponent };
