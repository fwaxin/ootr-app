import { createTheme, PaletteMode, Theme, ThemeOptions } from '@mui/material';

export type LadderPaletteMode = PaletteMode | 'system';

export const createAppTheme = (mode: PaletteMode): Theme => {
  const themeOption: ThemeOptions = {
    palette: {
      mode,
    },
  };

  return createTheme(themeOption);
};
