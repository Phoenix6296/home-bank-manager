import { useEffect, RefObject } from 'react';

export const useOutsideClick = (
  ref: RefObject<HTMLElement>,
  setShow: ((show: boolean) => void) | null = null,
  callBack: (() => void) | null = null
): void => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (setShow) {
          setShow(false);
        }
        if (callBack) {
          callBack();
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, setShow, callBack]);
};
