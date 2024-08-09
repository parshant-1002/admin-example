import { Navigate } from 'react-router-dom';
import { ROUTES_CONFIG, WILDCARD_ROUTES } from '../Shared/constants';
import Dashboard from '../Views/Dashboard';
import { ProductsList } from '../Views/Products';
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
    path: '/wishlist',
    element: 'Your wishlist here',
    title: 'Dashboard',
  },
  {
    path: '*',
    element: <Navigate to={WILDCARD_ROUTES.PRIVATE} />,
    title: 'Rendering wildcard',
  },
];
