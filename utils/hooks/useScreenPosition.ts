import { useState, useEffect, RefObject } from 'react';

interface DropdownPosition {
  shiftLeft: boolean;
  shiftUp: boolean;
}

export const useScreenPosition = (
  ref: RefObject<HTMLElement>,
  isVisible: boolean
): DropdownPosition => {
  const [shiftLeft, setShiftLeft] = useState(false);
  const [shiftUp, setShiftUp] = useState(false);

  useEffect(() => {
    if (ref.current && isVisible) {
      const rect = ref.current.getBoundingClientRect();
      const isOffScreenRight = rect.right > window.innerWidth;
      const isOffScreenBottom = rect.bottom > window.innerHeight;
      setShiftLeft(isOffScreenRight);
      setShiftUp(isOffScreenBottom);
    }
  }, [isVisible, ref]);

  return { shiftLeft, shiftUp };
};
