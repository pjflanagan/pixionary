
import { FC } from 'react';
import Image from 'next/image'

import { IconButtonElement, IconButtonElementProps } from 'elements';

import Style from './style.module.scss';
import Logo from './logo.png';

type HeaderElementProps = {
  actions: IconButtonElementProps[];
}

const HeaderElement: FC<HeaderElementProps> = ({
  actions
}) => {

  return (
    <>
      <div className={Style.header}>
        <Image alt="Pixionary" src={Logo} />
        <div className={Style.actionHolder}>
          {
            actions.map((action, i) => (
              <IconButtonElement
                key={`${i}-${action.icon}`}
                onClick={action.onClick}
                icon={action.icon}
              />
            ))
          }

        </div>
      </div>
    </>
  );

}


export { HeaderElement };