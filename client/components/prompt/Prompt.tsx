
import React, { FC } from 'react';

import { DrawingTitle, GameMode } from 'classes';

import Style from './style.module.scss';

type PromptComponentProps = {
  mode: GameMode;
}

const PromptComponent: FC<PromptComponentProps> = ({
  mode,
}) => {

  const prompt = {
    REVEAL: 'It was',
    DRAW: `Let's draw:`,
    GUESS: 'Who is this?'
  }[mode];

  return (
    <div className={Style.prompt}>{prompt}</div>
  );
}


export { PromptComponent };