
import React, { FC } from 'react';

import Style from './style.module.scss';

const ContainerElement: FC = ({
  children
}) => {

  return (
    <div className={Style.container}>
      {children}
    </div>
  );
}


export { ContainerElement };