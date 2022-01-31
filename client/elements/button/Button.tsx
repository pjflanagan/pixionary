import React, { FC, useRef } from 'react';
import classNames from 'classnames';

import Style from './style.module.scss';

export type ButtonElementProps = {
  onClick: () => void;
  label: string;
  type?: 'primary'
}

const ButtonElement: FC<ButtonElementProps> = ({
  onClick,
  label,
  type
}) => {

  const className = classNames(Style.button, {
    [Style[type]]: !!type
  });

  return (
    <div className={className} onClick={onClick}>
      {label}
    </div>
  );

}


export { ButtonElement };