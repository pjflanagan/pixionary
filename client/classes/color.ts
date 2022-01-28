
export type Color = string;

const HUE_ROW_SECTION_LENGTH = 11;

const GRAYSCALE = [
  ['#FFF', '#666'],
  ['#CCC', '#333'],
  ['#999', '#000'],
]

const makePalletRow = (row: number): Color[] => {
  const luminosityValue = [
    75,
    50,
    25
  ][row];

  const hueRowSection = [...Array(HUE_ROW_SECTION_LENGTH)].map((_, i) => {
    const hue = Math.floor(360 * i / HUE_ROW_SECTION_LENGTH);
    return `hsl(${hue}, 100%, ${luminosityValue}%)`;
  });
  const greyScaleSection = GRAYSCALE[row];
  return [...greyScaleSection, ...hueRowSection];
}

export const PALLET = [
  makePalletRow(0),
  makePalletRow(1),
  makePalletRow(2),
];
