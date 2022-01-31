import React, { FC, useRef } from 'react';
import classNames from 'classnames';
import { useClickAway } from 'react-use';

import { ButtonElement, ButtonElementProps, ButtonRowElement } from 'elements'

import Style from './style.module.scss';

type PopupElementProps = {
  isOpen: boolean;
  title: string;
  actions: ButtonElementProps[];
  onClose: () => void;
  children: JSX.Element | JSX.Element[];
}

const PopupElement: FC<PopupElementProps> = ({
  isOpen,
  title,
  children,
  actions,
  onClose
}) => {

  const ref = useRef(null);
  useClickAway(ref, onClose);

  const className = classNames(Style.popupOverlay, {
    [Style.open]: isOpen
  });

  return (
    <div className={className}>
      <div className={Style.popupModal} ref={ref}>
        <div className={Style.title}>{title}</div>
        <div className={Style.content}>{children}</div>
        <ButtonRowElement>
          <ButtonElement key="close" onClick={onClose} label="Close" />
          {
            actions.map((action, i) => (
              <ButtonElement key={i} onClick={action.onClick} label={action.label} type={action.type} />
            ))
          }
        </ButtonRowElement>
      </div>
    </div>
  );

}


export { PopupElement };