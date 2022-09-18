import BookIcon from 'components/icons/BookIcon';
import HomeIcon from 'components/icons/HomeIcon';
import TrophyIcon from 'components/icons/TrophyIcon';
import { MenuRoute } from 'types';

export const menuRoutes: MenuRoute = [
  {
    name: 'Home',
    href: '/',
    startIcon: <HomeIcon />,
  },
  {
    name: 'Leaderboard',
    href: '/leaderboard',
    startIcon: <TrophyIcon />,
  },
  {
    name: 'Wiki',
    startIcon: <BookIcon />,
    routes: [
      {
        name: 'Shuffle Setting Summary',
        href: '/wiki/lightShuffle',
      },
    ],
  },
];
