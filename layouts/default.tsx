import { FC, PropsWithChildren } from 'react';

import { Disclosure } from '@headlessui/react';

import MyAccount from 'components/Account';
import AppMenu from 'components/AppMenu';
import ThemeSwitcher from 'components/ThemeSwitcher';

import { menuRoutes } from '../config/routes';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Disclosure
        as="nav"
        className="fixed w-full backdrop-blur-md bg-white/30 dark:bg-gray-900/60 border-b-[1px] border-slate-100 z-[1500]"
      >
        <div className="flex items-center h-16">
          <div className="px-2 sm:px-6 lg:px-8">OoTR Ladder</div>
          <AppMenu routes={menuRoutes} />
          <ThemeSwitcher />
          <MyAccount />
        </div>
      </Disclosure>
      <div className="container pt-20 px-8">{children}</div>
    </>
  );
};

export default Layout;
