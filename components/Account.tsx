import { FC } from "react";

import { AccountCircle, Login, Settings } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from "@mui/material";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";

import useUser from "hooks/useUser";
import Link from "next/link";

import DiscordIcon from "./Icons/DiscordIcon";

const MyAccount: FC = () => {
  const { user } = useUser({});

  return (
    <>
      {user && Object.keys(user).length > 0 ? (
        <PopupState variant="popover" popupId="my-account-menu">
          {(accountMenu) => (
            <>
              <IconButton {...bindTrigger(accountMenu)}>
                <Avatar
                  alt={`${user.username}'s avatar`}
                  src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`}
                  sx={{ width: 36, height: 36 }}
                />
              </IconButton>
              <Popover
                {...bindPopover(accountMenu)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                sx={{
                  "& .MuiPopover-paper": {
                    width: 300,
                  },
                }}
              >
                <Box display="flex" p={2} sx={{ alignItems: "center" }}>
                  {user.avatar ? (
                    <Avatar
                      alt={`${user.username}'s avatar`}
                      src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`}
                      sx={{ width: 36, height: 36 }}
                    />
                  ) : (
                    <AccountCircle />
                  )}
                  <Box ml={1}>
                    <Typography variant="body1">
                      {`${user.username} #${user.discriminator}`}
                    </Typography>
                    <Typography variant="body2" color="text.disabled">{user.profile || "No role attributed yet"}</Typography>
                  </Box>
                </Box>
                <Divider />
                <MenuList dense>
                  <MenuItem disabled href="#">
                    <ListItemIcon>
                      <AccountCircle fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Profile</ListItemText>
                    <Typography variant="overline" color="primary">
                      Coming soon
                    </Typography>
                  </MenuItem>
                  <MenuItem disabled href="#">
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Settings</ListItemText>
                    <Typography variant="overline" color="primary">
                      Coming soon
                    </Typography>
                  </MenuItem>
                </MenuList>
                <Divider />
                <MenuList>
                  <Link href="/api/auth/logout">
                    <MenuItem>Logout</MenuItem>
                  </Link>
                </MenuList>
              </Popover>
            </>
          )}
        </PopupState>
      ) : (
        <Link href="/api/auth/login" passHref>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<DiscordIcon fontSize="small" />}
          >
            Login with Discord
          </Button>
        </Link>
      )}
    </>
  );
};

export default MyAccount;
