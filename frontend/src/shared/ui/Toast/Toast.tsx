import { useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom';
import './toast.scss';
import toast, { ToastType } from '../../lib/toast/toast';

const Toast = () => {
  const [toastState, setToastState] = useState<{
    type: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    const unsubscribe = toast.subscribe((event) => {
      setToastState(event);
      setTimeout(() => {
        setToastState(null);
      }, 4000);
    });

    return unsubscribe;
  }, []);

  if (!toastState) return null;

  return ReactDOM.createPortal(
    <div
      style={{
        backgroundColor: `${
          toastState.type === ToastType.SUCCESS ? '#4caf51' : '#f44436'
        }`,
      }}
      className="toast"
    >
      {typeof toastState.message === 'string'
        ? toastState.message
        : 'Something went wrong!'}
    </div>,
    document.getElementById('root') as HTMLElement
  );
};

export default Toast;
