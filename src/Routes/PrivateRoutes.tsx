import { Navigate } from 'react-router-dom';
import { ROUTES_CONFIG, WILDCARD_ROUTES } from '../Shared/constants/constants';
import Dashboard from '../Views/Dashboard';
import { ProductsList } from '../Views/Plans';
import Users from '../Views/Users';
import UserDetails from '../Views/Users/UserDetails';
import { CustomRouter } from './RootRoutes';
import TransactionHistory from '../Views/TransactionHistory';
import WithdrawalRequest from '../Views/WithdrawalRequest';

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
    path: ROUTES_CONFIG.WITHDRAWAL_LIST.path,
    element: <WithdrawalRequest />,
    title: ROUTES_CONFIG.WITHDRAWAL_LIST.title,
  },
  {
    path: ROUTES_CONFIG.TRANSACTION_HISTORY.path,
    element: <TransactionHistory />,
    title: ROUTES_CONFIG.TRANSACTION_HISTORY.title,
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
  // Wildcard
  {
    path: '*',
    element: <Navigate to={WILDCARD_ROUTES.PRIVATE} />,
    title: 'Rendering wildcard',
  },
];
