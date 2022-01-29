import { Color } from "./color"

type Row = number;
type Col = number;

const ROW = 0;
const COL = 1;
const COLOR = 2;

export type Pixel = [Row, Col, Color]

export const getColor = (pixel: Pixel) => pixel[COLOR];

export const findPixel = (pixels: Pixel[], row: number, col: number): Pixel | undefined =>
  pixels.find(p => p[ROW] === row && p[COL] === col);

// replaces or adds a pixel
export const colorPixel = (pixels: Pixel[], newPixel: Pixel) => {
  const selectedPixel = findPixel(pixels, newPixel[ROW], newPixel[COL]);
  if (!selectedPixel) {
    return [...pixels, newPixel];
  }
  selectedPixel[COLOR] = newPixel[COLOR];
  return [...pixels];
}