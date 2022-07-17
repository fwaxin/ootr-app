import { useEffect } from 'react';

import Router from 'next/router';
import useSWR from 'swr';

import { User } from '../types';

export default function useUser({ redirectTo = '', redirectIfFound = false } = {}) {
  const { data: user, error, mutate: mutateUser } = useSWR<User>('/api/user/');

  useEffect(() => {
    if (!redirectTo || !user) return;

    if ((redirectTo && !redirectIfFound && !!user?.isLoggedIn) || (redirectIfFound && !user?.isLoggedIn)) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, isLoading: !error && !user, isError: error, mutateUser };
}
