
import React, { FC } from 'react';

import { DrawingTitle } from 'classes';

import { SegmentedInput } from './segmentedInput';

import Style from './style.module.scss';


type PuzzleHeaderComponentProps = {
  mode: 'REVEAL' | 'DRAW' | 'GUESS';
  drawPrompt?: DrawingTitle;
  puzzleAnswer?: DrawingTitle;
}

const PuzzleHeaderComponent: FC<PuzzleHeaderComponentProps> = ({
  mode,
  drawPrompt,
  puzzleAnswer
}) => {

  const renderPuzzleTitle = () => (
    <div className={Style.title}>
      <span className={Style.name}>{drawPrompt.name}</span>
      <span className={Style.epithet}>from <i>{drawPrompt.source}</i></span>
    </div>
  );

  const renderSegmentedInput = () => (
    <SegmentedInput
      correctWord={puzzleAnswer?.name || ''}
      onSubmit={console.log}
    />
  );

  const prompt = {
    REVEAL: 'It was',
    DRAW: `Let's draw:`,
    GUESS: 'Who is this?'
  }[mode];

  return (
    <div className={Style.puzzleHeader}>
      <div className={Style.prompt}>{prompt}</div>
      <div className={Style.puzzleActionOrInfo}>
        {(mode === 'REVEAL' || mode === 'DRAW') && renderPuzzleTitle()}
        {mode === 'GUESS' && renderSegmentedInput()}
      </div>
    </div>
  );
}


export { PuzzleHeaderComponent };