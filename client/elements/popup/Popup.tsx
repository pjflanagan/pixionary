import React, { FC } from 'react';
import classNames from 'classnames';

import Style from './style.module.scss';

type Action = {
  name: string;
  effect: () => void;
}

type PopupElementProps = {
  isOpen: boolean;
  title: string;
  actions: Action[];
  children: JSX.Element | JSX.Element[];
}

const PopupElement: FC<PopupElementProps> = ({
  isOpen,
  title,
  children,
  actions
}) => {

  const className = classNames(Style.popupOverlay, {
    [Style.open]: isOpen
  });

  return (
    <div className={className}>
      <div className={Style.popupModal}>
        <div className={Style.title}>{title}</div>
        <div className={Style.content}>{children}</div>
        <div className={Style.actions}>
          {
            actions.map((action, i) => (
              <div key={i} onClick={action.effect}>{action.name}</div>
            ))
          }
        </div>
      </div>
    </div>
  );

}


export { PopupElement };