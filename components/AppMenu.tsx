import { type FC, Fragment, useState, useEffect } from 'react';

import { Disclosure, Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import MenuLink from 'components/common/MenuLink';
import useHasMounted from 'hooks/useHasMounted';
import useIsMobile from 'hooks/useIsMobile';
import { MenuRoute } from 'types';

import TriforceIcon from './icons/TriforceIcon';

interface AppMenuProps {
  routes: MenuRoute;
}

const AppMenu: FC<AppMenuProps> = ({ ...props }) => {
  const isMounted = useHasMounted();
  const isMobile = useIsMobile();
  const router = useRouter();

  const [isDeployed, setIsDeployed] = useState<boolean>(false);

  const setOpenState = (state: boolean) => {
    if (!isMobile || isDeployed === state) {
      return;
    }

    setIsDeployed(state);
  };

  useEffect(() => {
    if (isDeployed) {
      document.body.classList.add('overflow-hidden');
    }
  }, [isDeployed]);

  const renderMobileMenu = () => (
    <>
      <div className="flex items-center grow space-x-2">
        <button
          type="button"
          className="p-2 rounded-md hover:bg-gray-900/10 dark:hover:bg-white/10 transition-colors"
          onClick={() => setOpenState(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        <div className="flex items-center text-sm">
          <span className="inline-block mr-2 w-8 text-amber-200">
            <TriforceIcon />
          </span>
          OoTR Ladder
        </div>
      </div>
      <Transition
        as="div"
        show={isDeployed}
        enter="transition ease-in-out duration-500"
        enterFrom="opacity-0 translate-x-full"
        enterTo="opacity-100 translate-x-0"
        leave="transition ease-in-out duration-300"
        leaveFrom="opacity-100 translate-x-0"
        leaveTo="opacity-0 translate-x-52"
        afterLeave={() => {
          document.body.classList.remove('overflow-hidden');
        }}
        className="fixed backdrop-blur-md bg-white/90 dark:bg-gray-900/90 inset-0 z-[1501]"
        aria-labelledby="mobile-menu"
        role="dialog"
        arial-modal="true"
      >
        <div className="absolute right-0">
          <button
            type="button"
            className="p-3 m-2 hover:opacity-50 transition-opacity"
            onClick={() => {
              setOpenState(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="px-8 flex flex-col justify-center items-center space-y-4  h-screen w-full overflow-y-auto">
          {props.routes.map((routeItem) => {
            return routeItem.href ? (
              <Link key={routeItem.name} href={routeItem.href as string}>
                <a
                  className="inline-flex items-center text-2xl uppercase font-bold"
                  onClick={() => setOpenState(false)}
                >
                  {routeItem.startIcon && <span className="inline-block w-10 mr-4">{routeItem.startIcon}</span>}
                  {routeItem.name}
                </a>
              </Link>
            ) : (
              <Disclosure key={routeItem.name}>
                {({ open }) => (
                  <div className="flex flex-col items-center">
                    <Disclosure.Button className="inline-flex items-center text-2xl uppercase font-bold">
                      {routeItem.startIcon && <span className="inline-block w-10 mr-4">{routeItem.startIcon}</span>}
                      {routeItem.name}
                    </Disclosure.Button>
                    <Transition
                      show={open}
                      as="div"
                      enter="duration-150 ease-out"
                      enterFrom="py-0 opacity-0"
                      enterTo="py-4 opacity-100"
                      entered="py-4 opacity-100"
                      leave="duration-150 ease-out"
                      leaveFrom="py-4 opacity-100"
                      leaveTo="py-0 opacity-0"
                      className="transition-all overflow-hidden box-content"
                    >
                      <Disclosure.Panel className="flex flex-col space-y-2">
                        {routeItem.routes?.map((childRouteItem) => (
                          <Link key={childRouteItem.name} href={childRouteItem.href as string}>
                            <a className="inline-flex items-center text-base" onClick={() => setOpenState(false)}>
                              {childRouteItem.name}
                            </a>
                          </Link>
                        ))}
                      </Disclosure.Panel>
                    </Transition>
                  </div>
                )}
              </Disclosure>
            );
          })}
        </div>
      </Transition>
    </>
  );

  const renderDesktopMenu = () => (
    <div className="flex grow space-x-4">
      <div className="flex items-center mr-4">
        <span className="inline-block mr-2 w-8 text-amber-200">
          <TriforceIcon />
        </span>
        OoTR Ladder
      </div>
      {props.routes.map((routeItem) =>
        routeItem.href ? (
          <Link key={routeItem.name} href={routeItem.href as string} passHref>
            <a
              className={`inline-flex items-center hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${
                router.asPath === routeItem.href || router.pathname === routeItem.href
                  ? 'text-white bg-slate-700 dark:bg-white dark:text-slate-700'
                  : 'text-slate-700 hover:bg-gray-700 hover:text-white dark:text-white dark:hover:bg-white dark:hover:text-slate-700'
              }`}
              target={routeItem.newTab ? '_blank' : '_self'}
            >
              {routeItem.startIcon && <span className="inline-block w-5 mr-2">{routeItem.startIcon}</span>}
              {routeItem.name}
            </a>
          </Link>
        ) : (
          <Menu key={routeItem.name}>
            <div className="relative">
              <Menu.Button>
                <div className="inline-flex items-center 'text-slate-700 hover:bg-gray-700 hover:text-white dark:text-white dark:hover:bg-white dark:hover:text-slate-700 px-3 py-2 rounded-md text-sm font-medium">
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
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-slate-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1">
                    {routeItem.routes?.map((childRouteItem) => (
                      <Menu.Item key={childRouteItem.name}>
                        <MenuLink href={childRouteItem.href} newTab={childRouteItem.newTab}>
                          {childRouteItem.name}
                        </MenuLink>
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

  if (!isMounted) {
    return null;
  }

  return isMobile ? renderMobileMenu() : renderDesktopMenu();
};

export default AppMenu;
