import { FC, PropsWithChildren } from 'react';

import { alpha, AppBar, Box, Container, Divider, Toolbar, Typography, useTheme } from '@mui/material';

import MyAccount from 'components/Account';
import AppMenu from 'components/AppMenu';
import ThemeSwitcher from 'components/ThemeSwitcher';
import { menuRoutes } from 'config/routes';
import { TOPBAR_HEIGHT } from 'constant';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const theme = useTheme();
  return (
    <>
      <AppBar
        color="transparent"
        elevation={0}
        sx={{
          backgroundColor: alpha(theme.palette.background.default, 0.6),
          backdropFilter: 'blur(20px)',
        }}
      >
        <Toolbar sx={{ height: TOPBAR_HEIGHT }}>
          <Box display="flex" alignItems="flex-start" justifyContent="center" flexDirection="column" mr={2}>
            <Typography variant="h6">OoTR Ladder</Typography>
          </Box>
          <AppMenu routes={menuRoutes} />
          <ThemeSwitcher />
          <MyAccount />
        </Toolbar>
        <Divider />
      </AppBar>
      <Container
        maxWidth="xl"
        sx={{
          marginTop: `${TOPBAR_HEIGHT}px`,
          py: 6,
          minHeight: `calc(100vh - ${TOPBAR_HEIGHT}px - 1px)`,
        }}
      >
        {children}
      </Container>
    </>
  );
};

export default Layout;
