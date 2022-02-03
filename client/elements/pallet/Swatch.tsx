
import React, { FC } from 'react';
import classNames from 'classnames';

import { Color } from 'models';

import Style from './style.module.scss';

type SwatchElementProps = {
  color: Color;
  onClick: () => void;
  selected: boolean;
}

const SwatchElement: FC<SwatchElementProps> = ({
  color,
  onClick,
  selected,
}) => {
  const className = classNames(Style.swatch, {
    [Style.selected]: selected
  })
  return (
    <div className={className} style={{ background: color }} onClick={onClick} />
  );
}


export { SwatchElement };