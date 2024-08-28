import 'bootstrap/dist/css/bootstrap.min.css';
import { useCallback, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import './App.scss';
import RootRouter from './Routes/RootRouter';
import Loader from './Shared/components/loader';
import {
  setNotificationDeviceToken,
  updateNotificationToken,
} from './Shared/utils/functions';
import { persistor, store } from './Store';

const baseName = import.meta.env.VITE_BASE_NAME;
interface Window {
  PushAlertCo?: {
    getSubsInfo: () => { status: string; subs_id: string };
    subs_id?: string;
  };
  pushalertbyiw?: unknown[]; // Adjust the type as per your actual implementation
}
function App() {
  const onNotification = (data: unknown) => {
    console.log('PushAlert Notification Received:', data);
    // Add your notification handling logic here
  };
  const callbackOnFailure = (result: { status: boolean }) => {
    console.log(result?.status);
    console.log('PERMISSION Denied');
  };
  const handleSuccessPushAlert = (
    subscriptionDetails: { subscriber_id: string },
    deviceToken: string | null,
    userToken: string | null
  ) => {
    const token = subscriptionDetails?.subscriber_id;
    console.log('onSuccess token from pushAlert ', token);
    if (token) {
      setNotificationDeviceToken(token);
      updateNotificationToken({ deviceToken, userToken, token });
    }
  };

  const getTokenPushAlert = useCallback(
    (deviceToken: string | null, userToken: string | null) => {
      const windowObject: Window & typeof globalThis = window;
      const subsInfo = windowObject?.PushAlertCo?.getSubsInfo(); // You can call this method to get the subscription status of the subscriber
      const token = windowObject?.PushAlertCo?.subs_id;

      console.log(`Status: ${subsInfo?.status}, subs_id: ${subsInfo?.subs_id}`);

      if (token) {
        updateNotificationToken({ deviceToken, userToken, token });
        setNotificationDeviceToken(token);
      }
      (windowObject.pushalertbyiw || []).push([
        'onNotification',
        onNotification,
      ]);
      (windowObject.pushalertbyiw || []).push(['onFailure', callbackOnFailure]);
    },
    []
  );

  useEffect(() => {
    const deviceToken = store?.getState()?.common?.deviceToken;
    const userToken = store?.getState()?.common?.token;
    const windowObject: Window & typeof globalThis = window;
    (windowObject.pushalertbyiw || []).push([
      'onReady',
      () => getTokenPushAlert(deviceToken, userToken),
    ]);
    (windowObject.pushalertbyiw || []).push([
      'onSuccess',
      (subscriptionDetails: { subscriber_id: string }) =>
        handleSuccessPushAlert(subscriptionDetails, deviceToken, userToken),
    ]);
  }, [getTokenPushAlert]);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <HelmetProvider>
          <Loader />
          <ToastContainer autoClose={3000} limit={3} />
          <BrowserRouter basename={baseName}>
            <RootRouter />
          </BrowserRouter>
        </HelmetProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
