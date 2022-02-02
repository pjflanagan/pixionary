
import React, { FC, useState } from 'react';
import { useCounter, useInterval } from 'react-use';

import { DailyScore, MAX_GUESSES } from '../../Daily';
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
  onSubmit: (score: DailyScore) => void;
}

const GuessInput: FC<GuessInputProps> = ({
  correctWord,
  onSubmit
}) => {
  const [guessCount, { inc }] = useCounter(0);
  const [seconds, setSeconds] = useState(0);
  const [intervalSpeed, setIntervalSpeed] = useState(1000);

  useInterval(() => {
    setSeconds(seconds + 1);
  }, intervalSpeed);

  const handleIncorrectGuess = () => {
    if (guessCount === MAX_GUESSES) {
      setIntervalSpeed(null);
      onSubmit({
        guessCount,
        timeSeconds: seconds,
      });
      return;
    }
    inc();
  }

  const handleCorrectGuess = () => {
    setIntervalSpeed(null);
    onSubmit({
      guessCount,
      timeSeconds: seconds,
    });
  }

  return (
    <>
      <div className={Style.infoRow}>
        <div className={Style.tries}>Guesses remaining: {formatGuessesRemaining(MAX_GUESSES - guessCount)}</div>
        <div className={Style.timer}>{formatTime(seconds)}</div>
      </div>
      <SegmentedInput
        correctWord={correctWord}
        onCorrect={handleCorrectGuess}
        onIncorrect={handleIncorrectGuess}
      />
    </>
  );

}


export { GuessInput };