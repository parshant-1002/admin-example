import { Navigate } from 'react-router-dom';
import { ROUTES_CONFIG, WILDCARD_ROUTES } from '../Shared/constants';
import Dashboard from '../Views/Dashboard';
// import { ProductsAdd, ProductsList } from '../Views/Products';
import AuctionManagementList from '../Views/Auction/AuctionManagementList';
import { ProductsList } from '../Views/Products';
import { CustomRouter } from './RootRoutes';
import { CategoriesList } from '../Views/Categories';
import Users from '../Views/Users';
import UserDetails from '../Views/Users/UserDetails';
import AuctionDetails from '../Views/Auction/AuctionDetails/AuctionDetails';

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
    path: ROUTES_CONFIG.PRODUCTS.path,
    element: <ProductsList />,
    title: ROUTES_CONFIG.PRODUCTS.title,
  },
  {
    path: ROUTES_CONFIG.CATEGORIES.path,
    element: <CategoriesList />,
    title: ROUTES_CONFIG.CATEGORIES.title,
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
