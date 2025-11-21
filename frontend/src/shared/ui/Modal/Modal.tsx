import { ReactNode, useCallback, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import './modal.scss';
import { FocusTrap } from 'focus-trap-react';

type Props = {
  onClose: () => void;
  children: ReactNode;
  isOpen: boolean;
};

const Modal = ({ onClose, isOpen, children }: Props) => {
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  return ReactDOM.createPortal(
    <>
      <div
        className="modal-background"
        aria-hidden="true"
        onClick={onClose}
      ></div>
      <FocusTrap focusTrapOptions={{ clickOutsideDeactivates: true }}>
        <div
          className="modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="modal__content">{children}</div>
        </div>
      </FocusTrap>
    </>,
    (document.getElementById('root') as HTMLElement) || document.body
  );
};

export default Modal;
