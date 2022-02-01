
import React, { FC, useState, useEffect } from 'react';
import { useInterval } from 'react-use';

import { Pixel, GRID_SIDE_ARRAY, findPixel, addPixel, DrawingTitle } from 'classes';

import { PixelElement } from './Pixel';
import { TitleElement } from './Title';

import Style from './style.module.scss';

type CanvasWatchElementProps = {
  pixels: Pixel[];
  title: DrawingTitle;
  titleVisible: boolean;
  isPlaying: boolean;
}

const CanvasWatchElement: FC<CanvasWatchElementProps> = ({
  pixels,
  title,
  titleVisible,
  isPlaying
}) => {

  const [displayPixels, setDisplayPixels] = useState<Pixel[]>([]);

  const [pixelIndex, setPixelIndex] = useState(0);
  const [intervalSpeed, setIntervalSpeed] = useState<number | null>(null);

  useEffect(() => {
    if (isPlaying) {
      setIntervalSpeed(80);
      return;
    }
  }, [isPlaying]);

  useInterval(() => {
    if (pixelIndex === pixels.length) {
      setIntervalSpeed(null);
      return;
    }
    setDisplayPixels(addPixel(displayPixels, pixels[pixels.length - pixelIndex - 1]));
    setPixelIndex(pixelIndex + 1);
  }, intervalSpeed);

  return (
    <>
      <TitleElement title={title} visible={titleVisible} />
      <div className={Style.gridContainer}>
        <div className={Style.gridHolder}>
          <div className={Style.grid}>
            {
              GRID_SIDE_ARRAY.map((_, row) => (
                <div className={Style.row} key={row}>
                  {
                    GRID_SIDE_ARRAY.map((_, col) => {
                      const pixel = findPixel(displayPixels, row, col);
                      return (
                        <div className={Style.col} key={col}>
                          <PixelElement
                            drawEnabled={false}
                            pixel={pixel}
                          />
                        </div>
                      );
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


export { CanvasWatchElement };