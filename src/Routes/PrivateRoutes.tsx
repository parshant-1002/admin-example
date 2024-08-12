import { Navigate } from 'react-router-dom';
import { CustomRouter } from './RootRoutes';
import { ROUTES_CONFIG, WILDCARD_ROUTES } from '../Shared/constants';
import Dashboard from '../Views/Dashboard';
import { ProductsAdd, ProductsList } from '../Views/Products';
import AuctionManagementList from '../Views/Auction/AuctionManagementList';
import AuctionDetails from '../Views/Auction/AuctionDetails';

// eslint-disable-next-line import/prefer-default-export
export const PRIVATE_ROUTES: Array<CustomRouter> = [
  {
    path: ROUTES_CONFIG.AUCTION_MANAGEMENT.path,
    element: <AuctionManagementList />,
    title: ROUTES_CONFIG.AUCTION_MANAGEMENT.title,
  },
  {
    path: ROUTES_CONFIG.AUCTION_DETAILS.path,
    element: <AuctionDetails />,
    title: ROUTES_CONFIG.AUCTION_DETAILS.title,
  },
  {
    path: ROUTES_CONFIG.HOMEPAGE.path,
    element: <Dashboard />,
    title: ROUTES_CONFIG.HOMEPAGE.title,
  },
  {
    path: ROUTES_CONFIG.PRODUCTS_ADD.path,
    element: <ProductsAdd initialData={{}} isEdit={false} />,
    title: ROUTES_CONFIG.PRODUCTS_ADD.title,
  },
  {
    path: ROUTES_CONFIG.PRODUCTS_LIST.path,
    element: <ProductsList />,
    title: ROUTES_CONFIG.PRODUCTS_LIST.title,
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
