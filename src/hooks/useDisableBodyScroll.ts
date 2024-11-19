import { useEffect, useRef } from 'react';

export const useDisableBodyScroll = (isOpen: boolean) => {
  const originalStyles = useRef({
    overflow: '',
    touchAction: '',
  });

  useEffect(() => {
    originalStyles.current = {
      overflow: document.body.style.overflow,
      touchAction: document.body.style.touchAction,
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    }

    return () => {
      document.body.style.overflow = originalStyles.current.overflow;
      document.documentElement.style.overflow = originalStyles.current.overflow;
      document.body.style.touchAction = originalStyles.current.touchAction;
    };
  }, [isOpen]);
};
