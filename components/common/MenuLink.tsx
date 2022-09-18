import { forwardRef } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

const MenuLink = forwardRef((props: any, ref) => {
  const router = useRouter();
  const { href, children, ...rest } = props;
  return (
    <Link href={href}>
      <a
        className={`group flex hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium w-full ${
          router.asPath === href ? 'text-white bg-slate-700' : 'text-slate-700 hover:bg-gray-700 hover:text-white'
        }`}
        ref={ref}
        {...rest}
      >
        {children}
      </a>
    </Link>
  );
});
MenuLink.displayName = 'MenuLink';

export default MenuLink;
