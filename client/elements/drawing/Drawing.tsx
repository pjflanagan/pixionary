
import React, { FC } from 'react';

import { Color, Pixel } from 'types';

import { PixelElement } from './Pixel';

import Style from './style.module.scss';

const SIDE_LENGTH = 8;

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
        [...Array(SIDE_LENGTH)].map((_, row) => (
          <div className={Style.row}>
            {
              [...Array(SIDE_LENGTH)].map((_, col) => {
                const pixel = pixels.find(p => p.row === row && p.col === col);
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