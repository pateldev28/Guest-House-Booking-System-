import toast from 'react-hot-toast';

export const notify = {
  success: (message) => toast.success(message, {
    duration: 4000,
    position: 'top-right',
    style: {
      background: '#4BB543',
      color: '#fff',
    },
  }),
  error: (message) => toast.error(message, {
    duration: 4000,
    position: 'top-right',
    style: {
      background: '#FF3333',
      color: '#fff',
    },
  }),
  info: (message) => toast(message, {
    duration: 4000,
    position: 'top-right',
    style: {
      background: '#3498db',
      color: '#fff',
    },
  }),
  loading: (message) => toast.loading(message, {
    position: 'top-right',
  }),
  dismiss: (id) => toast.dismiss(id),
  promise: (promise, messages) => toast.promise(promise, messages, {
    position: 'top-right',
  }),
};