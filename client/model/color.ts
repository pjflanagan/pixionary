
import convertToHex from 'hsl-to-hex';

export type Color = string;

const HUE_ROW_SECTION_LENGTH = 11;

export const PALLET_INITIAL_COLOR = '#ff0000';

const GRAYSCALE = [
  ['#ffffff', '#666666'],
  ['#cccccc', '#333333'],
  ['#999999', '#000000'],
]

const makePalletRow = (row: number): Color[] => {
  const luminosityValue = [
    75,
    50,
    25
  ][row];

  const hueRowSection = [...Array(HUE_ROW_SECTION_LENGTH)].map((_, i) => {
    const hue = Math.floor(360 * i / HUE_ROW_SECTION_LENGTH);
    return convertToHex(hue, 100, luminosityValue)
  });
  const greyScaleSection = GRAYSCALE[row];
  return [...greyScaleSection, ...hueRowSection];
}

export const PALLET = [
  makePalletRow(0),
  makePalletRow(1),
  makePalletRow(2),
];
