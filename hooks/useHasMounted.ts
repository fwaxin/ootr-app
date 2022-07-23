import { useEffect, useState } from 'react';

/**
 * Hook to use as a workaround for hydration inconsitencies due to SSR
 *
 * @returns boolean
 */
export default function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
}
