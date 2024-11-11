import { ROUTES } from '../../../constants/constants';

const SIDEBAR_NAV = [
  {
    iconClass: 'bi bi-grid',
    label: 'Dashboard',
    route: ROUTES.HOMEPAGE,
  },
  {
    iconClass: 'bi bi-user',
    label: 'Users',
    route: ROUTES.USERS,
  },
  {
    iconClass: 'bi bi-product',
    label: 'Plans',
    route: ROUTES.PRODUCTS,
  },
  {
    iconClass: 'bi bi-product',
    label: 'Transactions',
    route: ROUTES.TRANSACTION_HISTORY,
  },
  {
    iconClass: 'bi bi-product',
    label: 'WithDrawal Requests',
    route: ROUTES.WITHDRAWAL_LIST,
  },
];

export default SIDEBAR_NAV;
