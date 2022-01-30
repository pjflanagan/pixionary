
import React, { FC, useState } from 'react';

import { Pixel, GRID_SIDE_ARRAY, findPixel, Color } from 'classes';

import { PixelElement } from './Pixel';

import Style from './style.module.scss';

type DrawingComponentProps = {
  color: Color;
  pixels: Pixel[];
  colorPixel: (row: number, col: number) => void;
  drawDisabled?: boolean;
  playMode?: boolean;
}

const DrawingComponent: FC<DrawingComponentProps> = ({
  color,
  pixels,
  colorPixel: colorPixelProp,
  drawDisabled
}) => {

  const [isBrushDown, setIsBrushDown] = useState(false);

  const startPainting = () => {
    if (drawDisabled) {
      return;
    }
    setIsBrushDown(true);
  }

  const colorPixel = (row: number, col: number) => {
    if (drawDisabled) {
      return;
    }
    colorPixelProp(row, col);
  }

  return (
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
                          color={color}
                          pixel={pixel}
                          colorPixel={() => colorPixel(row, col)}
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
  );

}


export { DrawingComponent };