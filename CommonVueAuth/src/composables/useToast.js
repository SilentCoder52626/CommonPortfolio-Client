import { inject } from 'vue';

export function useToast() {
  const toast = inject('toast');
  if (!toast) {
    throw new Error('useToast must be used within a component setup function.');
  }

  const showSuccess = (message, title="") => {
    toast.success(message, title);
  };

    const showError = (message, title="") => {
    toast.error(message, title);
  };

    const showInfo = (message, title="") => {
    toast.info(message, title);
  };

    const showWarning = (message, title="") => {
    toast.warning(message, title);
  };

  return {
    success: showSuccess,
    error: showError,
    info: showInfo,
    warning: showWarning,
  };
}