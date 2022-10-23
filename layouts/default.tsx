import { FC, PropsWithChildren } from 'react';

import MyAccount from 'components/Account';
import AppMenu from 'components/AppMenu';
import FooterMenu from 'components/FooterMenu';
import ThemeSwitcher from 'components/ThemeSwitcher';

import { menuRoutes, ressourcesLinkList } from '../config/routes';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <nav className="fixed w-screen bg-white/30 dark:bg-gray-900/60 border-b border-slate-100 dark:border-slate-700 z-[1500]">
        <div className="px-6 lg:px-8 flex items-center h-16 before:content-[''] before:absolute before:inset-0  before:backdrop-blur before:-z-10">
          <AppMenu routes={menuRoutes} />
          <ThemeSwitcher />
          <MyAccount />
        </div>
      </nav>
      <div className="container pt-20 pb-8 px-8 min-h-[100vh]">{children}</div>
      <FooterMenu routes={ressourcesLinkList} />
    </>
  );
};

export default Layout;
