import { type FC, Fragment, forwardRef } from 'react';

import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import MenuLink from 'components/common/MenuLink';
import useHasMounted from 'hooks/useHasMounted';
import { MenuRoute } from 'types';

interface AppMenuProps {
  routes: MenuRoute;
}

const AppMenu: FC<AppMenuProps> = ({ ...props }) => {
  const isMounted = useHasMounted();
  const router = useRouter();

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex grow space-x-4">
      {props.routes.map((routeItem) =>
        routeItem.href ? (
          <Link key={routeItem.name} href={routeItem.href as string}>
            <a
              className={`inline-flex items-center hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                router.asPath === routeItem.href || router.pathname === routeItem.href
                  ? 'text-white bg-slate-700'
                  : 'text-slate-700 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {routeItem.startIcon && <span className="inline-block w-5 mr-2">{routeItem.startIcon}</span>}
              {routeItem.name}
            </a>
          </Link>
        ) : (
          <Menu key={routeItem.name}>
            <div className="relative">
              <Menu.Button>
                <div className="inline-flex items-center text-slate-700 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  {routeItem.startIcon && <span className="inline-block w-5 mr-2">{routeItem.startIcon}</span>}
                  {routeItem.name}
                </div>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1">
                    {routeItem.routes?.map((childRouteItem) => (
                      <Menu.Item key={childRouteItem.name}>
                        <MenuLink href={childRouteItem.href}>{childRouteItem.name}</MenuLink>
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </div>
          </Menu>
        ),
      )}
    </div>
  );
};

export default AppMenu;
