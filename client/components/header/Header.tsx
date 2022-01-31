
import { FC, useState } from 'react';
import Image from 'next/image'

import Style from './style.module.scss';

import Logo from './logo.png';
import { PopupElement } from 'elements';

const HeaderComponent: FC = () => {

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const popupActions = [
    {
      name: 'Close',
      effect: () => setIsPopupOpen(false)
    }
  ];

  const openPopup = () => {
    setIsPopupOpen(true);
  }

  return (
    <>
      <PopupElement isOpen={isPopupOpen} title="Info" actions={popupActions} >
        <p>Pixionary is a pop culture drawing game with pixels.</p>
      </PopupElement>
      <div className={Style.header}>
        <Image alt="Pixionary" src={Logo} />
        <span onClick={openPopup}>Info</span>
      </div>
    </>
  );

}


export { HeaderComponent };