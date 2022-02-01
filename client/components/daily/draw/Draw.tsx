
import { FC, useState } from 'react';
import { useCopyToClipboard } from 'react-use';

import { DrawingTitle, PALLET_INITIAL_COLOR, GameMode, Puzzle, Pixel } from 'classes'
import { ButtonElement, ButtonRowElement, ContainerElement, PalletElement, HeaderElement, GuessInput, PromptElement, CanvasDrawElement, CanvasWatchElement } from 'elements';

const PROMPT: DrawingTitle = {
  name: 'Jerry Smith',
  source: 'Rick and Morty'
}

const DrawComponent: FC = () => {

  // Draw
  const [drawPrompt, setDrawPrompt] = useState(PROMPT);
  const [drawPixels, setDrawPixels] = useState<Pixel[]>([]);
  const [color, setColor] = useState(PALLET_INITIAL_COLOR);

  const handleSubmitDrawing = () => {

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
        <ButtonElement label="Clear" onClick={() => setDrawPixels([])} />
        <ButtonElement label="Skip" onClick={() => console.log('skip')} type="secondary" />
        {/* TODO: open a popup that asks to confirm, with a share dialogue */}
        <ButtonElement label="Submit" onClick={() => console.log('submit')} type="primary" />
      </ButtonRowElement>
    </>
  )
}

export { DrawComponent };
