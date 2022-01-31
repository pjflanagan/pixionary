
import React, { FC } from 'react';

import { DrawingTitle, GameMode } from 'classes';

import Style from './style.module.scss';

type TitleComponentProps = {
  title: DrawingTitle;
  visible: boolean;
}

const TitleComponent: FC<TitleComponentProps> = ({
  title,
  visible,
}) => {

  return (
    <div className={Style.puzzleActionOrInfo}>
      <div className={Style.title}>
        {
          visible && <>
            <span className={Style.name}>{title.name}</span>
            <span className={Style.epithet}> from <i>{title.source}</i></span>
          </>
        }
      </div>
    </div>
  );
}


export { TitleComponent };