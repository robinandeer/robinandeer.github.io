import { useCallback, useEffect, useMemo, useState } from 'react';

export default function useMediaQuery(breakpoint: string): boolean {
  const mql = useMemo(() => window.matchMedia(`(min-width: ${breakpoint})`), [breakpoint]);
  const [value, setValue] = useState(mql.matches);

  const updateValue = useCallback((event: MediaQueryListEvent) => setValue(event.matches), []);

  useEffect(() => {
    if (mql.addEventListener) {
      mql.addEventListener('change', updateValue);
      return (): void => mql.removeEventListener('change', updateValue);
    } else if (mql.addListener) {
      mql.addListener(updateValue);
      return (): void => mql.removeListener(updateValue);
    }
  }, [updateValue]);

  return value;
}
