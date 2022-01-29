
import React, { FC } from 'react';

import { DrawingTitle, PuzzleAnswer } from 'classes';
import { SegmentedInput } from 'elements';

import Style from './style.module.scss';


type PuzzleHeaderComponentProps = {
  mode: 'REVEAL' | 'DRAW' | 'GUESS';
  drawPrompt?: DrawingTitle;
  puzzleAnswer?: PuzzleAnswer;
}

const PuzzleHeaderComponent: FC<PuzzleHeaderComponentProps> = ({
  drawPrompt,
  puzzleAnswer
}) => {

  const renderPuzzleTitle = () => (
    <div className={Style.title}>
      <div className={Style.name}>{drawPrompt.name}</div>
      <div className={Style.epithet}>from <i>{drawPrompt.source}</i></div>
    </div>
  );

  const renderSegmentedInput = () => (
    <SegmentedInput
      length={puzzleAnswer.length}
      onSubmit={console.log}
    />
  )

  return (
    <div className={Style.puzzleHeader}>
      <div className={Style.prompt}></div>
      <div className={Style.puzzleActionOrInfo}>
        {renderPuzzleTitle()}
      </div>
    </div>
  );
}


export { PuzzleHeaderComponent };