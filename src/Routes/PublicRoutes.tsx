import { Navigate } from 'react-router-dom';
import { ROUTES_CONFIG, WILDCARD_ROUTES } from '../Shared/constants';
import LoginPage from '../Views/Auth/login/LoginPage';
import OtpForm from '../Views/Auth/otpForm';
import { CustomRouter } from './RootRoutes';

// eslint-disable-next-line import/prefer-default-export
export const PUBLIC_ROUTES: Array<CustomRouter> = [
  {
    path: `${ROUTES_CONFIG.LOGIN.path}`,
    title: ROUTES_CONFIG.LOGIN.title,
    element: <LoginPage />,
  },
  {
    path: `${ROUTES_CONFIG.OTP_FORM.path}`,
    title: ROUTES_CONFIG.OTP_FORM.title,
    element: <OtpForm />,
  },
  {
    path: '*',
    element: <Navigate to={WILDCARD_ROUTES.PUBLIC} />,
    title: 'Rendering wildcard',
  },
];
