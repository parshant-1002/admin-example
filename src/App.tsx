import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Store';
import RootRouter from './Routes/RootRouter';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

const baseName = import.meta.env.VITE_BASE_NAME;

function App() {
  // const [count, setCount] = useState<number>(0);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <HelmetProvider>
          <BrowserRouter basename={baseName}>
            <RootRouter />
          </BrowserRouter>
        </HelmetProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
