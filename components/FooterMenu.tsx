import { FC } from 'react';

import Link from 'next/link';

import useHasMounted from 'hooks/useHasMounted';
import { MenuRoute } from 'types';

interface AppMenuProps {
  routes: MenuRoute;
}

const FooterMenu: FC<AppMenuProps> = ({ routes }) => {
  const isMounted = useHasMounted();

  if (!isMounted) {
    return null;
  }

  return (
    <div className="py-5 flex items-center justify-center border-t border-slate-100 dark:border-slate-700">
      {routes.map((ressourceItem, index) => (
        <Link key={`ressourceLink-${index}`} href={ressourceItem.href as string} passHref>
          <a
            className="inline-block text-slate-700/40 hover:text-slate-700 dark:text-white/40 dark:hover:text-white"
            title={ressourceItem.name}
            target={ressourceItem.newTab ? '_blank' : '_self'}
          >
            <span className="inline-block w-5">{ressourceItem.startIcon}</span>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default FooterMenu;
