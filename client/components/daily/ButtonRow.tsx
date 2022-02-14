
import { FC } from 'react';

import { ButtonElement, ButtonRowElement } from 'elements';
import { DailyGamePhase } from 'models';

type ButtonRowComponentProps = {
  isVisible: boolean;
  gamePhase: DailyGamePhase;
  cycleGamePhase: (gamePhase: DailyGamePhase) => void;
  handleShare: () => void;
}

const ButtonRowComponent: FC<ButtonRowComponentProps> = ({
  isVisible,
  gamePhase,
  cycleGamePhase,
  handleShare
}) => {

  const renderButtonRow = () => {
    if (isVisible) {
      return null;
    }
    switch (gamePhase) {
      case DailyGamePhase.START:
        return (
          <ButtonRowElement>
            <ButtonElement label="Start" onClick={() => cycleGamePhase(DailyGamePhase.GUESS)} type="primary" />
          </ButtonRowElement>
        );
      case DailyGamePhase.STATS:
        return (
          <ButtonRowElement>
            <ButtonElement label="Share" onClick={handleShare} type="secondary" />
            <ButtonElement label="Continue" onClick={() => cycleGamePhase(DailyGamePhase.DRAW)} type="primary" />
          </ButtonRowElement>
        );
      case DailyGamePhase.THANKS:
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
