
import { MdSettings, MdVideogameAsset, MdEqualizer, MdInfo } from 'react-icons/md';

export const getIcon = (name: string): JSX.Element => {
  switch (name) {
    case 'info':
      return <MdInfo />;
    case 'settings':
      return <MdSettings />;
    case 'stats':
      return <MdEqualizer />;
  }
  return <MdVideogameAsset />;
}