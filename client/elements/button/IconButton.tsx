import { getIcon } from "elements/icon";
import { FC } from "react";

import Style from './style.module.scss';

export type IconButtonElementProps = {
  onClick: () => void;
  icon: string;
}

const IconButtonElement: FC<IconButtonElementProps> = ({
  onClick,
  icon
}) => {
  return (
    <div className={Style.iconButton} onClick={onClick}>
      {getIcon(icon)}
    </div>
  );
}


export { IconButtonElement };