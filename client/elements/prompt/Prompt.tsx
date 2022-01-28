
import React, { FC } from 'react';
import classNames from 'classnames';

import { Prompt } from 'classes';

import Style from './style.module.scss';

type PromptElementProps = {
  prompt: Prompt;
}

const PromptElement: FC<PromptElementProps> = ({
  prompt
}) => {
  return (
    <div className={Style.prompt}>
      <div className={Style.name}>{prompt.name}</div>
      <div className={Style.epithet}>from <i>{prompt.source}</i></div>
    </div>
  );
}


export { PromptElement };