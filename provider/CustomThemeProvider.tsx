import { createContext, FC, ReactNode, useEffect, useMemo, useState } from 'react';

import { PaletteMode, ThemeProvider, useMediaQuery } from '@mui/material';
import { useCookie } from 'react-use';

import { createAppTheme, LadderPaletteMode } from 'theme';

export const ColorModeContext = createContext({ setColorMode: (option: PaletteMode) => {} });

interface CustomThemeProviderProps {
  children: ReactNode;
}

const CustomThemeProvider: FC<CustomThemeProviderProps> = ({ children }) => {
  const isSysPrefDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [themeInMemory, updateThemeInMemory] = useCookie('ladderAppTheme');

  const defaultInitialTheme = isSysPrefDarkMode ? 'dark' : 'light';
  const preferedThemePalette = themeInMemory && themeInMemory !== null ? themeInMemory : defaultInitialTheme;

  const [selectedTheme, setSelectedTheme] = useState<PaletteMode>(preferedThemePalette as PaletteMode);

  const colorMode = useMemo(
    () => ({
      setColorMode: (option: PaletteMode) => {
        setSelectedTheme(option);
        updateThemeInMemory(option);
      },
    }),
    [],
  );

  const appTheme = useMemo(() => createAppTheme(selectedTheme as PaletteMode), [selectedTheme]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={appTheme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default CustomThemeProvider;
