import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import style from './Modal.module.css';
import { useDisableBodyScroll } from '@/hooks/useDisableBodyScroll';
//import { clsx } from '@/shared/lib/clsx';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  modalClassName?: string;
  backdropClassName?: string;
  shouldDisableScroll?: boolean;
}

const Modal = ({ children, onClose, backdropClassName, modalClassName, shouldDisableScroll }: ModalProps) => {
  useDisableBodyScroll(shouldDisableScroll ?? false);

  useEffect(() => {
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = (evt: React.MouseEvent<HTMLDivElement>) => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={`${style.backdrop} ${backdropClassName}`} onMouseDown={(evt) => handleBackdropClick(evt)}>
      <div className={`${style.modal} ${modalClassName}`}>
        <button className={style.close} type='button' onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
