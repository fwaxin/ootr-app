import { FC } from 'react';

import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import PopupState, { bindHover, bindPopover } from 'material-ui-popup-state';
import HoverPopover from 'material-ui-popup-state/HoverPopover';
import Link from 'next/link';

import useHasMounted from 'hooks/useHasMounted';
import { MenuRoute } from 'types';

interface AppMenuProps {
  routes: MenuRoute;
}

const AppMenu: FC<AppMenuProps> = ({ ...props }) => {
  const hasComponentBeenMounted = useHasMounted();

  return !hasComponentBeenMounted ? null : (
    <Stack direction="row" spacing={1} flexGrow={1}>
      {props.routes.map((routeItem, index) => {
        const { name, routes, href, ...routeProps } = routeItem;
        return href ? (
          <Link key={`menuItem-${index}-${name}`} href={href} passHref>
            <Button {...routeProps}>{name}</Button>
          </Link>
        ) : (
          routes && (
            <PopupState key={`menuItem-${index}-${name}`} variant="popover" popupId={`menuPopup-${name}`}>
              {(popupState) => (
                <>
                  <Button {...routeProps} {...bindHover(popupState)}>
                    {name}
                  </Button>
                  <HoverPopover
                    {...bindPopover(popupState)}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    sx={{
                      '& .MuiPopover-paper': {
                        minWidth: 150,
                      },
                    }}
                  >
                    <MenuList dense>
                      {routes.map((subRoute) => {
                        const { name, href, ...subRouteProps } = subRoute;
                        return (
                          <Link key={`menuItem-${index}-${name}`} href={href as string} passHref>
                            <MenuItem>
                              <ListItemText>{name}</ListItemText>
                            </MenuItem>
                          </Link>
                        );
                      })}
                    </MenuList>
                  </HoverPopover>
                </>
              )}
            </PopupState>
          )
        );
      })}
    </Stack>
  );
};

export default AppMenu;
