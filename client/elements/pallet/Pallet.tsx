
import React, { FC, useEffect } from 'react';

import { PALLET, Color } from 'classes';

import { SwatchElement } from './Swatch';
import Style from './style.module.scss';

type PalletElementProps = {
  setColor: (color: Color) => void;
  selectedColor: Color;
}

const PalletElement: FC<PalletElementProps> = ({
  setColor,
  selectedColor
}) => {

  useEffect(() => {
    // TODO: need some type of color mapping instead
    // or a hsl to hex function
    setColor('hsl(0, 100%, 50%)');
  }, []);

  return (
    <div className={Style.pallet}>
      {
        PALLET.map((_, row) => (
          <div className={Style.row} key={row}>
            {
              PALLET[row].map((_, col) => {
                const color = PALLET[row][col];
                return (
                  <div className={Style.col} key={col}>
                    <SwatchElement
                      color={color}
                      onClick={() => setColor(color)}
                      selected={color === selectedColor}
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


export { PalletElement };