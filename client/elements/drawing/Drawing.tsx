
import React, { FC, useState } from 'react';

import { Pixel, GRID_SIDE_ARRAY, findPixel, Color } from 'classes';

import { PixelElement } from './Pixel';

import Style from './style.module.scss';

type DrawingElementProps = {
  color: Color;
  pixels: Pixel[];
  colorPixel: (row: number, col: number) => void;
}

const DrawingElement: FC<DrawingElementProps> = ({
  color,
  pixels,
  colorPixel
}) => {

  const [isMouseDown, setIsMouseDown] = useState(false);

  return (
    <div
      className={Style.grid}
      onMouseLeave={() => setIsMouseDown(false)}
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
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
                      isMouseDown={isMouseDown}
                    />
                  </div>);
              })
            }
          </div>
        ))
      }
    </div>
  );

}


export { DrawingElement };