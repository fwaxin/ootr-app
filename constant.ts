import { Key } from 'react';

import { PaletteMode } from '@mui/material';

// Theme related constants

export const THEMES: Record<Key, PaletteMode> = {
  LIGHT: 'light',
  DARK: 'dark',
};

// Layout related constants

export const TOPBAR_HEIGHT: number = 64;

export const LADDER_CAT_READABLE_NAME: any = {
  lightShuffle: 'Shuffle (light)',
};

export const ONE_DAY = 60 * 60 * 24;
export const ONE_HOUR = 60 * 60;
export const ONE_MINUTE = 60;
