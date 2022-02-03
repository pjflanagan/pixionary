
import { FC, useState } from 'react';
import Image from 'next/image'

import Style from './style.module.scss';

import Logo from './logo.png';
import { ButtonElementProps, PopupElement } from 'elements';

const HeaderElement: FC = () => {

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const popupActions: ButtonElementProps[] = [
    {
      label: 'Share',
      onClick: () => console.log('share'),
      type: 'primary'
    }
  ];

  const openPopup = () => {
    setIsPopupOpen(true);
  }

  return (
    <>
      <PopupElement isOpen={isPopupOpen} title="Info" actions={popupActions} onClose={() => setIsPopupOpen(false)}>
        <p>Pixionary is a pop culture drawing game with pixels.</p>
        <p>First, guess the character being drawn. The faster you guess, the better your score! But watch out, you only get 3 chances.</p>
        <p>Next, draw a character that might be used as a puzzle in the future.</p>
      </PopupElement>
      <div className={Style.header}>
        <Image alt="Pixionary" src={Logo} />
        <div className={Style.actionHolder}>
          {/* TODO: take actions: IconElementProps[] */}
          <span className={Style.infoLink} onClick={openPopup}>Info</span>

        </div>
      </div>
    </>
  );

}


export { HeaderElement };