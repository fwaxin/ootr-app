import { FC } from 'react';

import { useTheme } from 'next-themes';

import { APP_THEME_CONF } from 'config/appConfig';
import useHasMounted from 'hooks/useHasMounted';

const ThemeSwitcher: FC = () => {
  const { theme, setTheme } = useTheme();
  const isMounted = useHasMounted();

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
          } border-slate-100 dark:border-slate-700 ${
            theme === themeName
              ? 'bg-emerald-500 text-white'
              : 'text-slate-700 dark:text-white hover:text-emerald-500 dark:hover:text-emerald-500'
          }`}
        >
          <span className="inline-block w-5">{icon}</span>
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
