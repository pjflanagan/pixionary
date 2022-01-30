
import { FC } from 'react';
import Image from 'next/image'

import Style from './style.module.scss';

import Logo from './logo.png';

const HeaderElement: FC = () => {

  // TODO: add a Popup with info

  return (
    <div className={Style.header}>
      <Image alt="Pixionary" src={Logo} />
    </div>
  );

}


export { HeaderElement };