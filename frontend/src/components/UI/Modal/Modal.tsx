import React from 'react';
import './modal.scss';
import * as ReactDOM from 'react-dom';

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  Content: JSX.Element;
};

const Modal = ({ setOpen, Content }: Props) => {
  return ReactDOM.createPortal(
    <div className="background" onClick={() => setOpen(false)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {Content}
      </div>
    </div>,
    document.getElementById('root') as HTMLElement
  );
};

export default Modal;
