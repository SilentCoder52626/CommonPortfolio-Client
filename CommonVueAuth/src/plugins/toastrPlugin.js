import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const toastrPlugin = {
  install(app, options = {}) {
    // Configure toastr with global options
    toastr.options = {
      closeButton: true,
      progressBar: true,
      positionClass: 'toast-top-right',
      timeOut: '3000',
      extendedTimeOut: '1000',
      preventDuplicates: true,
      newestOnTop : true,
      ...options, // Merge user options with defaults
    };

    // Add toastr methods to the global instance
    app.config.globalProperties.$toast = {
      success(message, title = '') {
        toastr.success(message, title);
      },
      error(message, title = '') {
        toastr.error(message, title);
      },
      info(message, title = '') {
        toastr.info(message, title);
      },
      warning(message, title = '') {
        toastr.warning(message, title);
      },
    };
  },
};

export default toastrPlugin;
