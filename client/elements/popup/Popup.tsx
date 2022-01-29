
import React, { createRef, FC, KeyboardEvent, ChangeEvent, useState } from 'react';

import Style from './style.module.scss';

type Action = {
  name: string;
  call: () => void;
}

type PopupElementProps = {
  isOpen: boolean;
  title: string;
  actions: Action[];
  children: JSX.Element | JSX.Element[];
}

const PopupElement: FC<PopupElementProps> = ({
  isOpen
}) => {

  return (
    <div className={Style.popupOverlay}>
      <div className={Style.popupModal}></div>
    </div>
  );

}


export { PopupElement };