import { EmojiEventsOutlined, HomeOutlined, LibraryBooksOutlined } from '@mui/icons-material';

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
