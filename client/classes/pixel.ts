import { Color } from "./color"

export type Pixel = {
  color: Color;
  row: number;
  col: number;
}

export const findPixel = (pixels: Pixel[], row: number, col: number): Pixel | undefined =>
  pixels.find(p => p.row === row && p.col === col);

// replaces or adds a pixel
export const colorPixel = (pixels: Pixel[], newPixel: Pixel) => {
  const selectedPixel = findPixel(pixels, newPixel.row, newPixel.col);
  if (!selectedPixel) {
    return [...pixels, newPixel];
  }
  selectedPixel.color = newPixel.color;
  return [...pixels];
}