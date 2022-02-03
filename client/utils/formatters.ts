
export const formatTime = (totalSeconds: number): string => {
  const minutes = `${Math.floor(totalSeconds / 60)}`.padStart(2, '0');
  const seconds = `${Math.floor(totalSeconds % 60)}`.padStart(2, '0');
  return `${minutes}:${seconds}`;
}