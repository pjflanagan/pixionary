import type { NextPage } from 'next'
import Head from 'next/head'

import { colorPixel, Pixel, Prompt } from 'classes'
import { DrawingElement, PalletElement, PromptElement } from 'elements';
import { useState } from 'react';

const PageDaily: NextPage = () => {
  const [color, setColor] = useState('#FFF');
  const [pixels, setPixels] = useState<Pixel[]>([]);

  const prompt: Prompt = {
    name: 'Morty',
    source: 'Rick and Morty'
  }

  const handlePixelClick = (newPixel: Pixel) => {
    setPixels(colorPixel(pixels, newPixel));
  }

  return (
    <>
      <Head>
        <title>Pixionary: Daily</title>
        <meta name="description" content="A daily pixel picture puzzle" />
      </Head>
      <PromptElement prompt={prompt} />
      <DrawingElement
        color={color}
        pixels={pixels}
        colorPixel={(row, col) => handlePixelClick({ row, col, color })}
      />
      <PalletElement
        setColor={setColor}
        selectedColor={color}
      />
    </>
  )
}

export default PageDaily;
