
import React, { FC } from 'react';

import Style from './style.module.scss';

export type PromptComponentProps = {
  color?: string;
  text: string;
}

const PromptComponent: FC<PromptComponentProps> = ({
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


export { PromptComponent };