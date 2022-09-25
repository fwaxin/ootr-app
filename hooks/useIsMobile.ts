import { createBreakpoint } from 'react-use';
import { screens } from 'tailwindcss/defaultTheme';

/**
 * Hook to get current breakpoint value
 *
 * @returns boolean
 */
export default function useIsMobile() {
  // The following code is made in order to translate default Tailwind breakpoints to use it with createBreakpoint()
  const formatedBreakPointList = Object.assign(
    {},
    ...Object.entries(screens).map(([name, value]) => {
      return { [name]: Number(value.replace(/\s*px/g, '')) };
    }),
  );

  const values = createBreakpoint(formatedBreakPointList);

  return values().includes('sm');
}
