
export enum Color {
  RED,
}

export type Pixel = {
  color: Color;
  row: number;
  col: number;
  drawOrder: number
}
