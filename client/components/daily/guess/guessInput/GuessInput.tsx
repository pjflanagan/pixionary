
import React, { FC, useState } from 'react';
import { useCounter, useInterval } from 'react-use';

import { SegmentedInput } from 'elements';

import Style from './style.module.scss';

const formatTime = (totalSeconds: number): string => {
  const minutes = `${Math.floor(totalSeconds / 60)}`.padStart(2, '0');
  const seconds = `${Math.floor(totalSeconds % 60)}`.padStart(2, '0');
  return `${minutes}:${seconds}`;
}

const formatGuessesRemaining = (guessesRemaining: number) => {
  if (guessesRemaining === 0) {
    return 'last chance!'
  }
  return guessesRemaining;
}

type GuessInputProps = {
  correctWord: string;
  onCorrect: () => void;
  onIncorrect: () => void;
}

const GuessInput: FC<GuessInputProps> = ({
  correctWord,
  onCorrect,
  onIncorrect
}) => {
  const [guessesRemaining, { dec }] = useCounter(3);
  const [seconds, setSeconds] = useState(0);

  useInterval(() => {
    setSeconds(seconds + 1);
  }, 1000);

  const handleIncorrectGuess = () => {
    if (guessesRemaining === 0) {
      onIncorrect();
      return;
    }
    dec();
  }

  return (
    <>
      <div className={Style.infoRow}>
        <div className={Style.tries}>Guesses remaining: {formatGuessesRemaining(guessesRemaining)}</div>
        <div className={Style.timer}>{formatTime(seconds)}</div>
      </div>
      <SegmentedInput correctWord={correctWord} onCorrect={onCorrect} onIncorrect={handleIncorrectGuess} />
    </>
  );

}


export { GuessInput };