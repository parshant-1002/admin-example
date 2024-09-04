const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        // console.log(
        //   'Service worker registered with scope:',
        //   registration.scope
        // );
        return registration.scope;
      })
      .catch((err) => {
        // console.error(
        //   'Service worker registration failed, error:',
        //   err.message
        // );
        return err;
      });
  } else {
    // console.error(
    //   'Service worker registration not enabled or browser does not support service workers.'
    // );
  }
};

export default registerServiceWorker;
