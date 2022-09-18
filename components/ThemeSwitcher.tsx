import { FC } from 'react';

import { useTheme } from 'next-themes';
import { useMountedState } from 'react-use';

import { APP_THEME_CONF } from 'config/appConfig';

const ThemeSwitcher: FC = () => {
  const { theme, setTheme } = useTheme();
  const isMounted = useMountedState();

  const setAppTheme = (e: any, appTheme: string) => {
    e.preventDefault();
    if (appTheme === theme) {
      return;
    }

    setTheme(appTheme);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex rounded-md text-sm mr-4" role="group">
      {APP_THEME_CONF.map(({ themeName, icon }, index, APP_THEME_CONF) => (
        <button
          key={`themeButton-${themeName}-${index}`}
          type="button"
          onClick={(e) => setAppTheme(e, themeName)}
          className={`inline-flex items-center py-2 px-2 ${
            index === 0
              ? 'rounded-l-md border'
              : index + 1 === APP_THEME_CONF.length
              ? 'rounded-r-md border'
              : 'border-t border-b'
          } border-gray-200 hover:bg-gray-100 text-slate-700 bg-white hover:text-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600`}
        >
          <span className="inline-block w-5">{icon}</span>
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
