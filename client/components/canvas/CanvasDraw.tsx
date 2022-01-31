
import React, { FC, useState } from 'react';

import { Pixel, GRID_SIDE_ARRAY, findPixel, Color, GameMode, addPixel, DrawingTitle } from 'classes';

import { PixelElement } from './Pixel';
import { TitleComponent } from './Title';

import Style from './style.module.scss';

type CanvasDrawComponentProps = {
  color: Color;
  pixels: Pixel[];
  setPixels: (newPixels: Pixel[]) => void;
  title: DrawingTitle;
}

const CanvasDrawComponent: FC<CanvasDrawComponentProps> = ({
  color,
  pixels,
  setPixels,
  title
}) => {

  // Draw
  const [isBrushDown, setIsBrushDown] = useState(false);

  const startPainting = () => {
    setIsBrushDown(true);
  }

  const handlePixelClick = (row: number, col: number) => {
    setPixels(addPixel(pixels, [row, col, color]));
  }

  return (
    <>
      <TitleComponent title={title} visible={true} />
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
                      const pixel = findPixel(pixels, row, col);
                      return (
                        <div className={Style.col} key={col}>
                          <PixelElement
                            drawEnabled
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


export { CanvasDrawComponent };