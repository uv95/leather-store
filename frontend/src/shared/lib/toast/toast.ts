export enum ToastType {
  ERROR = 'error',
  SUCCESS = 'success',
  INFO = 'info',
}

interface ToastEvent {
  type: ToastType;
  message: string;
}

type Callback = (event: ToastEvent) => void;

class Toast {
  private subscribers: Callback[] = [];

  subscribe(fn: Callback) {
    this.subscribers.push(fn);

    return () => {
      this.subscribers = this.subscribers.filter((cb) => cb !== fn);
    };
  }

  private emit(event: ToastEvent) {
    this.subscribers.forEach((fn) => fn(event));
  }

  success(message: string) {
    this.emit({ type: ToastType.SUCCESS, message });
  }

  error(message: string) {
    this.emit({ type: ToastType.ERROR, message });
  }

  info(message: string) {
    this.emit({ type: ToastType.INFO, message });
  }
}

const toast = new Toast();
export default toast;
