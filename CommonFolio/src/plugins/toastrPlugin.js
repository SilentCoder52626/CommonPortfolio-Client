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

    app.provide('toast', toastr);
  },
};

export default toastrPlugin;
