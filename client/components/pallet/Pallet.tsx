
import React, { FC, useEffect } from 'react';
import { useEffectOnce } from 'react-use';

import { PALLET, PALLET_INITIAL_COLOR, Color } from 'classes';

import { SwatchElement } from './Swatch';
import Style from './style.module.scss';

type PalletComponentProps = {
  setColor: (color: Color) => void;
  selectedColor: Color;
}

const PalletComponent: FC<PalletComponentProps> = ({
  setColor,
  selectedColor
}) => {

  return (
    <div className={Style.palletContainer}>
      <div className={Style.palletHolder}>
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

      </div>
    </div>
  );

}


export { PalletComponent };