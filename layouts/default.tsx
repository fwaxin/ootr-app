import { FC, PropsWithChildren } from "react";

import {
  alpha,
  AppBar,
  Container,
  Divider,
  Toolbar,
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
        sx={{
          backgroundColor: alpha("#ffffff", 0.6),
          backdropFilter: "blur(20px)",
        }}
      >
        <Toolbar sx={{ height: TOPBAR_HEIGHT }}>
          <AppMenu routes={menuRoutes} />
          <MyAccount />
        </Toolbar>
        <Divider />
      </AppBar>
      <Container
        maxWidth="xl"
        sx={{
          pt: `${TOPBAR_HEIGHT}px`,
          pb: 4,
          minHeight: `calc(100vh - ${TOPBAR_HEIGHT}px - 1px)`,
        }}
      >
        {children}
      </Container>
    </>
  );
};

export default Layout;
