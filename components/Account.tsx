import { FC, Fragment } from 'react';

import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';

import MenuLink from 'components/common/MenuLink';
import DiscordIcon from 'components/icons/DiscordIcon';
import useUser from 'hooks/useUser';

const MyAccount: FC = () => {
  const { user, isLoading } = useUser({});

  return (
    <div>
      {isLoading ? (
        <>Loading ...</>
      ) : user && Object.keys(user).length > 0 ? (
        <Menu as="div" className="relative">
          <Menu.Button className="flex rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 focus:ring-offset-white">
            <div className="sr-only">Open user menu</div>
            <Image
              className="rounded-full"
              alt={user.username}
              src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`}
              width={36}
              height={36}
            />
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
                <Menu.Item>
                  <MenuLink href="#">
                    <div className="flex items-center">
                      <Image
                        className="rounded-full"
                        alt={user.username}
                        src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`}
                        width={40}
                        height={40}
                      />
                      <div className="ml-4 grow">
                        <p className="block">{`${user.username}#${user.discriminator}`}</p>
                        <p className="inline-block p-1 uppercase text-[10px] leading-[10px] font-semibold rounded-full bg-emerald-100 text-emerald-600">
                          {user.profile || 'No role attributed yet'}
                        </p>
                      </div>
                    </div>
                  </MenuLink>
                </Menu.Item>
              </div>
              <div className="px-1 py-1">
                <Menu.Item>
                  <MenuLink href="/api/auth/logout">Log out</MenuLink>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      ) : (
        <Link href="/api/auth/login" passHref>
          <a className="inline-flex items-center rounded-md px-3 py-2 text-sm text-white font-medium bg-[#5865F2]">
            <span className="inline-block w-5 mr-2">
              <DiscordIcon />
            </span>
            Sign in
          </a>
        </Link>
      )}
    </div>
  );
};

export default MyAccount;
