
import React, { FC, useState } from 'react';

import { Color, Pixel } from 'classes';

import Style from './style.module.scss';

type PixelElementProps = {
  color: Color;
  pixel?: Pixel;
  colorPixel: () => void;
  isMouseDown: boolean;
}

const PixelElement: FC<PixelElementProps> = ({
  color,
  pixel,
  colorPixel,
  isMouseDown,
}) => {

  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
    if (isMouseDown) {
      colorPixel();
    }
  }

  const getBackground = () => {
    if (pixel) {
      if (isHover && pixel.color !== color) {
        return color;
      }
      return pixel.color;
    }
    if (isHover) {
      return color;
    }
    return 'none';
  }

  return (
    <div
      className={Style.pixel}
      onMouseDown={colorPixel}
      style={{
        background: getBackground(),
        opacity: isHover ? 0.8 : 1
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHover(false)}
    />
  );
}


export { PixelElement };