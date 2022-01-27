
import React, { FC } from 'react';
import classNames from 'classnames';

import { Pixel } from 'classes';

import Style from './style.module.scss';

type PixelElementProps = {
  pixel?: Pixel;
  onClick: () => void
}

const PixelElement: FC<PixelElementProps> = ({
  pixel,
  onClick
}) => {
  const pixelColor = pixel ? pixel.color : 'blank';
  const className = classNames(Style.pixel, Style[pixelColor]);
  return (
    <div className={className} onClick={onClick} />
  );
}


export { PixelElement };