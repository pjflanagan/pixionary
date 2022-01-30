import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react';

import { addPixel, Pixel, DrawingTitle, PALLET_INITIAL_COLOR } from 'classes'
import { ContainerElement, HeaderElement } from 'elements';
import { PuzzleHeaderComponent, DrawingComponent, PalletComponent } from 'components';

const PageDaily: NextPage = () => {
  const [color, setColor] = useState(PALLET_INITIAL_COLOR);
  const [pixels, setPixels] = useState<Pixel[]>([]);

  const handleSubmitGuess = (guess: string) => {
    console.log(guess);
  }

  const prompt: DrawingTitle = {
    name: 'Jerry Smith',
    source: 'Rick and Morty'
  }

  const handlePixelClick = (newPixel: Pixel) => {
    setPixels(addPixel(pixels, newPixel));
  }

  return (
    <>
      <Head>
        <title>Pixionary: Daily</title>
        <meta name="description" content="A daily pixel picture puzzle" />
      </Head>
      <ContainerElement>
        <HeaderElement />
        <PuzzleHeaderComponent
          mode="GUESS"
          drawPrompt={prompt}
          puzzleAnswer={prompt}
        />
        <DrawingComponent
          color={color}
          pixels={pixels}
          colorPixel={(row, col) => handlePixelClick([row, col, color])}
        />
        <PalletComponent
          setColor={setColor}
          selectedColor={color}
        />
      </ContainerElement>
    </>
  )
}

export default PageDaily;
