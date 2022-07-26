import EmojiEventsOutlined from '@mui/icons-material/EmojiEventsOutlined';
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import LibraryBooksOutlined from '@mui/icons-material/LibraryBooksOutlined';

import { MenuRoute } from 'types';

export const menuRoutes: MenuRoute = [
  {
    name: 'Home',
    href: '/',
    startIcon: <HomeOutlined fontSize="small" />,
  },
  {
    name: 'Leaderboard',
    href: '/leaderboard',
    startIcon: <EmojiEventsOutlined fontSize="small" />,
  },
  {
    name: 'Wiki',
    startIcon: <LibraryBooksOutlined fontSize="small" />,
    routes: [
      {
        name: 'Shuffle Setting Summary',
        href: '/wiki/lightShuffle',
      },
    ],
  },
];
