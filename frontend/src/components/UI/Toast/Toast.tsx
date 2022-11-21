import React, { useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import './toast.scss';

type Props = {
  text: string;
  type: string;
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

const Toast = ({ text, type, opened, setOpened }: Props) => {
  useEffect(() => {
    setTimeout(() => {
      setOpened(false);
    }, 4000);
  }, []);

  return ReactDOM.createPortal(
    <div
      style={{
        backgroundColor: `${type === 'success' ? '#4caf51' : '#f44436'}`,
      }}
      className="toast"
    >
      {text}
    </div>,
    document.getElementById('root') as HTMLElement
  );
};

export default Toast;
