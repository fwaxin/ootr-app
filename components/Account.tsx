import { FC } from 'react';

import AccountCircle from '@mui/icons-material/AccountCircle';
import Login from '@mui/icons-material/Login';
import Settings from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Link from 'next/link';

import useHasMounted from 'hooks/useHasMounted';
import useUser from 'hooks/useUser';

import DiscordIcon from './Icons/DiscordIcon';

const MyAccount: FC = () => {
  const hasComponentBeenMounted = useHasMounted();
  const { user, isLoading } = useUser({});

  return !hasComponentBeenMounted ? null : isLoading ? (
    <Box sx={{ p: 1 }}>
      <CircularProgress size={36} />
    </Box>
  ) : user && Object.keys(user).length > 0 ? (
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
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            sx={{
              '& .MuiPopover-paper': {
                width: 300,
              },
            }}
          >
            <Box display="flex" p={2} sx={{ alignItems: 'center' }}>
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
                <Typography variant="body1">{`${user.username} #${user.discriminator}`}</Typography>
                <Typography variant="body2" color="text.disabled">
                  {user.profile || 'No role attributed yet'}
                </Typography>
              </Box>
            </Box>
            {/* <Divider />
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
            </MenuList> */}
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
      <Button variant="outlined" color="inherit" startIcon={<DiscordIcon fontSize="small" />}>
        Login with Discord
      </Button>
    </Link>
  );
};

export default MyAccount;
