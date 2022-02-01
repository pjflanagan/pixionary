
import React, { FC, useState, useEffect } from 'react';
import classNames from 'classnames';

import Style from './style.module.scss';

type NotificationElementProps = {
  text: string;
  isOpen: boolean;
}

export const NotificationElement: FC<NotificationElementProps> = ({
  text,
  isOpen,
}) => {

  const className = classNames(Style.notification, {
    [Style.open]: isOpen
  });

  return (
    <div className={className}>
      {text}
    </div>
  );
}

export const useNotification = (duration: number = 3000): [boolean, string, (m: string) => void] => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false);
      }, duration);
    }
  }, [isOpen]);

  // TODO: this should take message: string, and maybe duration: number
  const sendNotification = (message: string) => {
    setIsOpen(true);
    setMessage(message);
  };

  return [isOpen, message, sendNotification];
}
