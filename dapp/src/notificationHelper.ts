import { toast } from 'react-toastify';

let notificationId: any = null;

export const notifyOnSuccess = (msg: string) => {
  toast.update(notificationId, {
    render: msg,
    type: 'success',
    isLoading: false,
    position: toast.POSITION.BOTTOM_RIGHT,
    closeButton: true,
    autoClose: 5000,
    pauseOnFocusLoss: false,
    style: {
      background: '#acda78',
      border: '1px solid #000',
      color: '#000'
    }
  });
};

export const notifyOnLoad = (msg: string) => {
  notificationId = toast.loading(msg, {
    position: toast.POSITION.BOTTOM_RIGHT,
    closeButton: true,
    pauseOnFocusLoss: false,
    style: {
      background: '#edd0a4',
      border: '1px solid #000',
      color: '#000'
    }
  });
};

export const notifyOnError = (msg: string) => {
  toast.update(notificationId, {
    render: msg,
    type: 'error',
    isLoading: false,
    position: toast.POSITION.BOTTOM_RIGHT,
    closeButton: true,
    autoClose: 5000,
    pauseOnFocusLoss: false,
    style: {
      background: '#ebaead',
      border: '1px solid #000',
      color: '#000'
    }
  });
};
export const notifyAllMints = (msg: string) => {
  toast.success(msg, {
    toastId: msg,
    isLoading: false,
    position: toast.POSITION.BOTTOM_RIGHT,
    closeButton: true,
    autoClose: 5000,
    pauseOnFocusLoss: false,
    style: {
      background: '#acda78',
      border: '1px solid #000',
      color: '#000'
    }
  });
};
