import { useCallback, useRef } from 'react';

export function useDebounce(callback: any, delay: number) {
  const timer = useRef<number | null>(null);
  const debouncedCallback = useCallback(
    (...args: any) => {
      if (timer.current) clearTimeout(timer.current);

      timer.current = window.setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
  return debouncedCallback;
}

export default useDebounce;
