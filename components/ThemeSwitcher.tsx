import { FC, useContext, useEffect, useState } from 'react';

import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlined from '@mui/icons-material/LightModeOutlined';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useCookie } from 'react-use';

import useHasMounted from 'hooks/useHasMounted';
import { ColorModeContext } from 'provider/CustomThemeProvider';

const ThemeSwitcher: FC = () => {
  const [appThemeSelected] = useCookie('ladderAppTheme');
  const hasComponentBeenMounted = useHasMounted();
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | null>(null);

  const colorMode = useContext(ColorModeContext);

  const handleThemeChange = (event: any, newTheme: 'light' | 'dark') => {
    if (newTheme !== null) {
      setThemeMode(newTheme as 'light' | 'dark');
      colorMode.setColorMode(newTheme);
    }
  };

  useEffect(() => {
    setThemeMode(appThemeSelected ? (appThemeSelected as 'light' | 'dark') : 'light');
  }, [appThemeSelected]);

  return !hasComponentBeenMounted ? null : (
    <Box sx={{ mr: 3 }}>
      <ToggleButtonGroup size="small" exclusive value={themeMode} onChange={handleThemeChange}>
        <ToggleButton value="light">
          <LightModeOutlined fontSize="small" />
        </ToggleButton>
        <ToggleButton value="dark">
          <DarkModeOutlined fontSize="small" />
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default ThemeSwitcher;
