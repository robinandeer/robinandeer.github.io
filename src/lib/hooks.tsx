import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const THEMES: Theme[] = ['light', 'dark'];
const THEME_KEY = 'theme';

const ThemeContext = createContext<Theme>('light');
const ToggleThemeContext = createContext<() => void>(() => {
  console.log('toggle');
});

function isTheme(value: any): value is Theme {
  return THEMES.includes(value);
}

function getPreferredTheme(): Theme | undefined {
  return typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
    : undefined;
}

function getLocalTheme(): Theme | undefined {
  const localTheme = typeof window !== 'undefined' && window.localStorage.getItem(THEME_KEY);
  return isTheme(localTheme) ? localTheme : undefined;
}

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(getLocalTheme() || getPreferredTheme() || 'light');
  const toggleTheme = useCallback(() => setTheme((prevValue) => (prevValue === 'dark' ? 'light' : 'dark')), []);

  const updateTheme = useCallback((event: MediaQueryListEvent) => {
    setTheme(event.matches ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    if (window.matchMedia) {
      const mql = window.matchMedia('(prefers-color-scheme: dark)');

      if (mql.addEventListener) {
        mql.addEventListener('change', updateTheme);
        return (): void => mql.removeEventListener('change', updateTheme);
      } else if (mql.addListener) {
        mql.addListener(updateTheme);
        return (): void => mql.removeListener(updateTheme);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(THEME_KEY, theme);
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>
      <ToggleThemeContext.Provider value={toggleTheme}>{children}</ToggleThemeContext.Provider>
    </ThemeContext.Provider>
  );
};

export function useTheme(): [Theme, () => void] {
  const theme = useContext(ThemeContext);
  const toggleTheme = useContext(ToggleThemeContext);

  return [theme, toggleTheme];
}
