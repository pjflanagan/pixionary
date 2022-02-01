
import React, { FC } from 'react';

import Style from './style.module.scss';

export type PromptElementProps = {
  color?: string;
  text: string;
}

const PromptElement: FC<PromptElementProps> = ({
  color,
  text,
}) => {

  return (
    <div
      className={Style.prompt}
      style={{
        color
      }}
    >{text}</div>
  );
}


export { PromptElement };