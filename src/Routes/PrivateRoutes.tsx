import { Navigate } from 'react-router-dom';
import { ROUTES_CONFIG, WILDCARD_ROUTES } from '../Shared/constants/constants';
import Dashboard from '../Views/Dashboard';
import ReservePriceReached from '../Views/NotificationsContentManagement/ReservePriceReached/ReservePriceReached';
import Footer from '../Views/PagesContentManagement/Footer';
import HeaderContent from '../Views/PagesContentManagement/HeaderContent';
import LogoutPopup from '../Views/PopupContentManagement/LogoutPopup';
import { ProductsList } from '../Views/Products';
import Users from '../Views/Users';
import UserDetails from '../Views/Users/UserDetails';
import { CustomRouter } from './RootRoutes';

// eslint-disable-next-line import/prefer-default-export
export const PRIVATE_ROUTES: Array<CustomRouter> = [
  {
    path: ROUTES_CONFIG.HOMEPAGE.path,
    element: <Dashboard />,
    title: ROUTES_CONFIG.HOMEPAGE.title,
  },
  {
    path: ROUTES_CONFIG.PRODUCTS.path,
    element: <ProductsList />,
    title: ROUTES_CONFIG.PRODUCTS.title,
  },
  {
    path: ROUTES_CONFIG.HEADERS_CONTENT.path,
    element: <HeaderContent />,
    title: ROUTES_CONFIG.HEADERS_CONTENT.title,
  },
  {
    path: ROUTES_CONFIG.FOOTER.path,
    element: <Footer />,
    title: ROUTES_CONFIG.FOOTER.title,
  },
  {
    path: ROUTES_CONFIG.USERS.path,
    element: <Users />,
    title: ROUTES_CONFIG.USERS.title,
  },
  {
    path: ROUTES_CONFIG.USERS_DETAILS.path,
    element: <UserDetails />,
    title: ROUTES_CONFIG.USERS_DETAILS.title,
  },

  {
    path: ROUTES_CONFIG.RESERVE_PRICE_REACHED.path,
    element: <ReservePriceReached />,
    title: ROUTES_CONFIG.RESERVE_PRICE_REACHED.title,
  },
  {
    path: ROUTES_CONFIG.LOGOUT_POPUP.path,
    element: <LogoutPopup />,
    title: ROUTES_CONFIG.LOGOUT_POPUP.title,
  },
  // Wildcard
  {
    path: '*',
    element: <Navigate to={WILDCARD_ROUTES.PRIVATE} />,
    title: 'Rendering wildcard',
  },
];
