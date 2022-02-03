
import { FC, useState } from 'react';

import { DrawingTitle, PALLET_INITIAL_COLOR, Pixel, GameMode } from 'models'
import { ButtonElement, ButtonRowElement, PalletElement, CanvasDrawElement } from 'elements';

const PROMPT: DrawingTitle = {
  name: 'Jerry Smith',
  source: 'Rick and Morty'
}

type DrawComponentProps = {
  cycleGameMode: (gameMode: GameMode) => void;
}

const DrawComponent: FC<DrawComponentProps> = ({
  cycleGameMode
}) => {

  // Draw
  const [drawPrompt, setDrawPrompt] = useState(PROMPT);
  const [drawPixels, setDrawPixels] = useState<Pixel[]>([]);
  const [color, setColor] = useState(PALLET_INITIAL_COLOR);

  const handleSubmitDrawing = () => {
    cycleGameMode(GameMode.THANKS);
  }

  const handleSkip = () => {
    cycleGameMode(GameMode.THANKS);
  }

  const drawingTitle = drawPrompt;

  return (
    <>
      <CanvasDrawElement
        color={color}
        pixels={drawPixels}
        setPixels={setDrawPixels}
        title={drawingTitle}
      />
      <PalletElement
        setColor={setColor}
        selectedColor={color}
      />
      <ButtonRowElement>
        <ButtonElement label="Clear" onClick={() => setDrawPixels([])} doubleClick />
        <ButtonElement label="Skip" onClick={handleSkip} type="secondary" doubleClick />
        <ButtonElement label="Submit" onClick={handleSubmitDrawing} type="primary" doubleClick />
      </ButtonRowElement>
    </>
  )
}

export { DrawComponent };
