import ComputerIcon from 'components/icons/ComputerIcon';
import MoonIcon from 'components/icons/MoonIcon';
import SunIcon from 'components/icons/SunIcon';

export const LADDER_CAT_READABLE_NAME: any = {
  lightShuffle: 'Shuffle (light)',
};

export const APP_THEME_CONF = [
  {
    themeName: 'light',
    icon: <SunIcon />,
  },
  {
    themeName: 'system',
    icon: <ComputerIcon />,
  },
  {
    themeName: 'dark',
    icon: <MoonIcon />,
  },
];
