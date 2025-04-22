import { useEffect, type RefObject } from 'react';

export default function useOnClickOutside(
  ref: RefObject<HTMLElement> | RefObject<null>,
  handler: () => void,
) {
  useEffect(() => {
    if (ref) {
      const listener = (event: MouseEvent | TouchEvent) => {
        if (!ref.current || ref.current.contains(event.target as Node)) {
          return;
        }
        handler();
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    }
  }, [ref, handler]);
}
