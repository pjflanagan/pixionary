
import React, { FC, useEffect, useState } from 'react';
import { useCounter, useInterval } from 'react-use';

import { DailyScore, MAX_GUESSES } from 'models';
import { SegmentedInput } from 'elements';
import { formatTime } from 'utils';

import Style from './style.module.scss';

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
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useInterval(() => {
    setSeconds(seconds + 1);
  }, intervalSpeed);

  useEffect(() => {
    if (guessCount === MAX_GUESSES) {
      handleSubmit();
      return;
    }
  }, [guessCount]);

  const handleSubmit = () => {
    setIntervalSpeed(null);
    setHasSubmitted(true);
    onSubmit({
      guessCount,
      timeSeconds: seconds,
    });
  }

  return (
    <>
      <div className={Style.infoRow}>
        <div className={Style.tries}>Guesses remaining: {MAX_GUESSES - guessCount}</div>
        <div className={Style.timer}>{formatTime(seconds)}</div>
      </div>
      <SegmentedInput
        correctWord={correctWord}
        onCorrect={handleSubmit}
        onIncorrect={inc}
        disabled={hasSubmitted}
      />
    </>
  );

}


export { GuessInput };