import { Color } from "./color"

export type Pixel = {
  color: Color;
  row: number;
  col: number;
}

export const findPixel = (pixels: Pixel[], row: number, col: number): Pixel | undefined =>
  pixels.find(p => p.row === row && p.col === col);