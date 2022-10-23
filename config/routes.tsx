import BookIcon from 'components/icons/BookIcon';
import DiscordIcon from 'components/icons/DiscordIcon';
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
    startIcon: <TrophyIcon />,
    routes: [
      {
        name: 'Standard leaderboard',
        href: '/leaderboard/standard',
      },
      {
        name: 'Shuffle leaderboard',
        href: '/leaderboard/shuffle',
      },
      {
        name: '[ARCHIVE] Light Shuffle leaderboard',
        newTab: true,
        href: '/leaderboard/lightShuffle',
      },
    ],
  },
  {
    name: 'Wiki',
    startIcon: <BookIcon />,
    routes: [
      {
        name: 'Shuffle Setting Summary',
        href: '/wiki/shuffle',
      },
    ],
  },
];

export const ressourcesLinkList: MenuRoute = [
  {
    name: 'Join our Discord server !',
    href: 'https://discord.gg/yXzzR8mdaf',
    newTab: true,
    startIcon: <DiscordIcon />,
  },
];
