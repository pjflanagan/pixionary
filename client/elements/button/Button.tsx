import React, { FC, useEffect, useState } from 'react';
import classNames from 'classnames';

import Style from './style.module.scss';

export type ButtonElementProps = {
  onClick: () => void;
  label: string;
  type?: 'primary' | 'secondary';
  doubleClick?: boolean;
}

const ButtonElement: FC<ButtonElementProps> = ({
  onClick,
  label,
  type,
  doubleClick
}) => {

  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    if (clickCount === 1) {
      setTimeout(() => {
        setClickCount(0);
      }, 2000);
    }
  }, [clickCount]);

  const handleClick = () => {
    if (doubleClick) {
      if (clickCount === 1) {
        onClick();
        setClickCount(0);
      } else {
        setClickCount(1);
      }
    } else {
      onClick();
    }
  }

  const className = classNames(Style.button, {
    [Style[type]]: !!type
  });

  return (
    <div className={className} onClick={handleClick}>
      {clickCount === 1 ? 'Confirm' : label}
    </div>
  );

}


export { ButtonElement };