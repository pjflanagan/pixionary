
import React, { FC, useState } from 'react';
import { useEffectOnce, useInterval } from 'react-use';
import { reverse } from 'lodash';

import { Pixel, GRID_SIDE_ARRAY, findPixel, Color, GameMode, addPixel, DrawingTitle } from 'classes';

import { PixelElement } from './Pixel';

import Style from './style.module.scss';
import { TitleComponent } from './Title';

type DrawingComponentProps = {
  color: Color;
  pixels: Pixel[];
  mode: GameMode;
  title: DrawingTitle;
}

const DrawingComponent: FC<DrawingComponentProps> = ({
  color,
  pixels,
  mode,
  title
}) => {

  const [displayPixels, setDisplayPixels] = useState<Pixel[]>([]);

  // Draw
  const [isBrushDown, setIsBrushDown] = useState(false);

  // Guess
  const [pixelIndex, setPixelIndex] = useState(0);
  const [intervalSpeed, setIntervalSpeed] = useState<number | null>(null);

  useEffectOnce(() => {
    if (mode === 'GUESS') {
      setIntervalSpeed(80);
      return;
    }
    setDisplayPixels(pixels);
    return;
  });

  useInterval(() => {
    if (pixelIndex === pixels.length) {
      setIntervalSpeed(null);
      return;
    }
    setDisplayPixels(addPixel(displayPixels, pixels[pixels.length - pixelIndex - 1]));
    setPixelIndex(pixelIndex + 1);
  }, intervalSpeed);

  const startPainting = () => {
    if (mode !== 'DRAW') {
      return;
    }
    setIsBrushDown(true);
  }

  const handlePixelClick = (row: number, col: number) => {
    if (mode !== 'DRAW') {
      return;
    }
    setDisplayPixels(addPixel(displayPixels, [row, col, color]));
  }

  return (
    <>
      <TitleComponent title={title} visible={mode !== 'GUESS'} />
      <div className={Style.gridContainer}>
        <div className={Style.gridHolder}>
          <div
            className={Style.grid}
            // brush up
            onMouseLeave={() => setIsBrushDown(false)}
            onMouseUp={() => setIsBrushDown(false)}
            onTouchCancel={() => setIsBrushDown(false)}
            onTouchEnd={() => setIsBrushDown(false)}
            // brush down
            onMouseDown={startPainting}
            onTouchStart={startPainting}
          >
            {
              GRID_SIDE_ARRAY.map((_, row) => (
                <div className={Style.row} key={row}>
                  {
                    GRID_SIDE_ARRAY.map((_, col) => {
                      const pixel = findPixel(displayPixels, row, col);
                      return (
                        <div className={Style.col} key={col}>
                          <PixelElement
                            drawEnabled={mode === 'DRAW'}
                            color={color}
                            pixel={pixel}
                            colorPixel={() => handlePixelClick(row, col)}
                            isBrushDown={isBrushDown}
                          />
                        </div>);
                    })
                  }
                </div>
              ))
            }
          </div>

        </div>
      </div>
    </>
  );

}


export { DrawingComponent };