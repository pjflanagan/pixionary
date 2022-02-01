import React, { FC } from 'react';

import Style from './style.module.scss';

export type ButtonRowElementProps = {
  children: any;
}

const ButtonRowElement: FC<ButtonRowElementProps> = ({
  children
}) => {

  return (
    <div className={Style.buttonRow}>
      {children}
    </div>
  );

}


export { ButtonRowElement };