
import React, { FC, useState } from 'react';

import { Color, Pixel, getColor } from 'classes';

import Style from './style.module.scss';

type PixelElementProps = {
  color: Color;
  pixel?: Pixel;
  colorPixel: () => void;
  isBrushDown: boolean;
  drawEnabled: boolean;
}

const PixelElement: FC<PixelElementProps> = ({
  color,
  pixel,
  colorPixel,
  isBrushDown,
  drawEnabled,
}) => {

  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    if (!drawEnabled) {
      return;
    }
    setIsHover(true);
    if (isBrushDown) {
      colorPixel();
    }
  }

  const getBackgroundAndOpacity = (): [string, number] => {
    if (pixel) {
      if (isHover && getColor(pixel) !== color) {
        return [color, 0.8];
      }
      return [getColor(pixel), 1];
    }
    if (isHover) {
      return [color, 0.8];
    }
    return ['none', 1];
  }

  const [backgroundColor, opacity] = getBackgroundAndOpacity();

  return (
    <div
      className={Style.pixel}
      onMouseDown={colorPixel}
      style={{
        background: backgroundColor,
        opacity: opacity
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHover(false)}
    />
  );
}


export { PixelElement };