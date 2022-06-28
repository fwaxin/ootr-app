import { FC, PropsWithChildren } from "react";

import {
  alpha,
  AppBar,
  Box,
  Container,
  Divider,
  Toolbar,
  Typography,
} from "@mui/material";

import AppMenu from "components/AppMenu";
import MyAccount from "components/Account";
import { menuRoutes } from "config/routes";
import { TOPBAR_HEIGHT } from "constant";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <AppBar
        color="transparent"
        elevation={0}
        style={{
          backgroundColor: alpha("#ffffff", 0.6),
          backdropFilter: "blur(20px)",
        }}
      >
        <Toolbar sx={{ height: TOPBAR_HEIGHT }}>
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="center"
            flexDirection="column"
            mr={2}
          >
            <Typography variant="h6">OoTR Ladder</Typography>
          </Box>
          <AppMenu routes={menuRoutes} />
          <MyAccount />
        </Toolbar>
        <Divider />
      </AppBar>
      <Container
        maxWidth="xl"
        style={{
          paddingTop: `${TOPBAR_HEIGHT}px`,
          paddingBottom: 4,
          minHeight: `calc(100vh - ${TOPBAR_HEIGHT}px - 1px)`,
        }}
      >
        {children}
      </Container>
    </>
  );
};

export default Layout;
