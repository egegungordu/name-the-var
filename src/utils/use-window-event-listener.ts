import { useEffect } from 'react';

export default function useWindowEventListener<K extends keyof WindowEventMap>(
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
) {
  useEffect(() => {
    window.addEventListener(type, listener, options);

    return () => {
      window.removeEventListener(type, listener, options);
    };
  }, [type, listener, options]);
}

