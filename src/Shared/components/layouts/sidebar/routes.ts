// import { ROUTES } from '../../../constants/routes';

import { ROUTES } from '../../../constants/constants';

const SIDEBAR_NAV = [
  {
    iconClass: 'bi bi-grid',
    label: 'Dashboard',
    route: ROUTES.HOMEPAGE,
  },
  {
    iconClass: 'bi bi-notification-content',
    label: 'Notifications Content',
    children: [
      {
        label: 'Reserve Price Reached',
        route: ROUTES.RESERVE_PRICE_REACHED,
      },
    ],
  },
  {
    iconClass: 'bi bi-pages-content',
    label: 'Popup pages Content',
    children: [
      {
        label: 'Logout',
        route: ROUTES.LOGOUT_POPUP,
      },
    ],
  },
  {
    iconClass: 'bi bi-pages-content',
    label: 'Pages Content',
    children: [
      {
        label: 'Headers',
        route: ROUTES.HEADERS_CONTENT,
      },
      {
        label: 'Footer',
        route: ROUTES.FOOTER,
      },
    ],
  },
  {
    iconClass: 'bi bi-user',
    label: 'Users',
    route: ROUTES.USERS,
  },
  {
    iconClass: 'bi bi-product',
    label: 'Products',
    route: ROUTES.PRODUCTS,
  },
];

export default SIDEBAR_NAV;
