import { Color } from "./color"
import { GRID_SIDE_LENGTH } from "./grid";

const MAX_PIXEL_LENGTH = GRID_SIDE_LENGTH * GRID_SIDE_LENGTH * 3;

type Row = number;
type Col = number;

const ROW = 0;
const COL = 1;
const COLOR = 2;

export type Pixel = [Row, Col, Color]

export const getColor = (pixel: Pixel) => pixel[COLOR];

// appends to the front, that way we can use find pixel to get
// the latest pixel, and still record the whole thing
export const addPixel = (pixels: Pixel[], newPixel: Pixel) => {
  if (pixels.length === MAX_PIXEL_LENGTH) {
    pixels.pop();
  }
  return [newPixel, ...pixels];
}

export const findPixel = (pixels: Pixel[], row: number, col: number): Pixel | undefined =>
  pixels.find(p => p[ROW] === row && p[COL] === col);

// replaces or adds a pixel
export const fillPixel = (pixels: Pixel[], newPixel: Pixel) => {
  const selectedPixel = findPixel(pixels, newPixel[ROW], newPixel[COL]);
  if (!selectedPixel) {
    return [...pixels, newPixel];
  }
  selectedPixel[COLOR] = newPixel[COLOR];
  return [...pixels];
}