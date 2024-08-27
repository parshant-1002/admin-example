// import { ROUTES } from '../../../constants/routes';

import { ROUTES } from '../../../constants';

const SIDEBAR_NAV = [
  {
    iconClass: 'bi bi-grid',
    label: 'Dashboard',
    route: ROUTES.HOMEPAGE,
  },
  {
    iconClass: 'bi bi-transactions',
    label: 'Notifications Content',
    children: [
      {
        label: 'Reserve Price Reached',
        route: ROUTES.RESERVE_PRICE_REACHED,
      },
      {
        label: 'New Bid Placed',
        route: ROUTES.NEW_BID_PLACED,
      },
      {
        label: 'Automatic Bid Runed Out',
        route: ROUTES.AUTOMATIC_BID_RUNNED_OUT,
      },
      {
        label: 'Bid Time Left',
        route: ROUTES.BID_TIME_LEFT,
      },
      {
        label: 'Winner',
        route: ROUTES.WINNER,
      },
      {
        label: 'Auction Ended',
        route: ROUTES.AUCTION_ENDED,
      },
    ],
  },
  {
    iconClass: 'bi bi-transactions',
    label: 'Pages Content',
    children: [
      {
        label: 'Headers',
        route: ROUTES.HEADERS_CONTENT,
      },
      {
        label: 'Hero Content',
        route: ROUTES.HERO_SECTION,
      },
      {
        label: 'Companies',
        route: ROUTES.COMPANIES_CONTENT,
      },
      {
        label: 'Top Auctions',
        route: ROUTES.TOP_AUCTION_SECTION,
      },
      {
        label: 'Bid Pack ',
        route: ROUTES.BID_PACK_SECTION,
      },
      {
        label: 'How It Works',
        route: ROUTES.HOW_IT_WORKS_CONTENT,
      },
      {
        label: 'FAQ',
        route: ROUTES.FQA_CONTENT,
      },
      {
        label: 'Contact US',
        route: ROUTES.CONTACTUS_CONTENT,
      },
      {
        label: 'Terms and Condition',
        route: ROUTES.TERM_AND_CONDITION_CONTENT,
      },
      {
        label: 'Privacy Policy',
        route: ROUTES.PRIVACY_POLICY_CONTENT,
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
    iconClass: 'bi bi-category',
    label: 'Categories',
    route: ROUTES.CATEGORIES,
  },
  {
    iconClass: 'bi bi-product',
    label: 'Products',
    route: ROUTES.PRODUCTS,
  },
  {
    iconClass: 'bi bi-grid',
    label: 'Auction Management',
    route: ROUTES.AUCTION_MANAGEMENT,
  },
  {
    // children: [],
    iconClass: 'bi bi-invoice',
    label: 'Invoices',
    children: [
      {
        label: 'Products',
        route: ROUTES.INVOICES_AUCTION,
      },
      {
        label: 'Bids',
        route: ROUTES.INVOICES_PURCHASE,
      },
    ],
  },
  {
    iconClass: 'bi bi-referral',
    label: 'Referral',
    route: ROUTES.CREATE_REFERRAL,
  },
  {
    iconClass: 'bi bi-bids',
    label: 'Bids Plans',
    route: ROUTES.BIDS_PLANS,
  },
  {
    iconClass: 'bi bi-transactions',
    label: 'Transactions',
    children: [
      {
        label: 'Plans History',
        route: ROUTES.TRANSACTIONS_PLANS_HISTORY,
      },
      {
        label: 'Bids History',
        route: ROUTES.TRANSACTIONS_BIDS_HISTORY,
      },
      {
        label: 'Products History',
        route: ROUTES.TRANSACTIONS_PRODUCTS_HISTORY,
      },
      {
        label: 'Referral History',
        route: ROUTES.TRANSACTIONS_REFERRAL_HISTORY,
      },
    ],
  },
];

export default SIDEBAR_NAV;
