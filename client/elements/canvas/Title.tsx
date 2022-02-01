
import React, { FC } from 'react';

import { DrawingTitle } from 'classes';

import Style from './style.module.scss';

type TitleElementProps = {
  title: DrawingTitle;
  visible: boolean;
}

const TitleElement: FC<TitleElementProps> = ({
  title,
  visible,
}) => {

  return (
    <div className={Style.title}>
      {
        visible && <>
          <span className={Style.name}>{title.name}</span>
          <span className={Style.epithet}> from <i>{title.source}</i></span>
        </>
      }
    </div>
  );
}


export { TitleElement };