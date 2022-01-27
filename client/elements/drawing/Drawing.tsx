
import React, { FC } from 'react';

import { Pixel, GRID_SIDE_ARRAY, findPixel } from 'classes';

import { PixelElement } from './Pixel';

import Style from './style.module.scss';


type DrawingElementProps = {
  pixels: Pixel[];
  onClick: (row: number, col: number) => void;
}

const DrawingElement: FC<DrawingElementProps> = ({
  pixels,
  onClick
}) => {
  return (
    <div className={Style.grid}>
      {
        GRID_SIDE_ARRAY.map((_, row) => (
          <div className={Style.row}>
            {
              GRID_SIDE_ARRAY.map((_, col) => {
                const pixel = findPixel(pixels, row, col);
                return (
                  <div className={Style.col}>
                    <PixelElement pixel={pixel} onClick={() => onClick(row, col)} />
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