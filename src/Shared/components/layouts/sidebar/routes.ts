// import { ROUTES } from '../../../constants/routes';

import { ROUTES } from '../../../constants';

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
      {
        label: 'New User Joined',
        route: ROUTES.NEW_USER_JOINED,
      },
      {
        label: 'Auction Started',
        route: ROUTES.AUCTION_STARTED,
      },
      {
        label: 'Bid Plan Purchased',
        route: ROUTES.BID_PLAN_PURCHASED,
      },
      {
        label: 'Contacted Support',
        route: ROUTES.CONTACTED_SUPPORT,
      },
    ],
  },
  {
    iconClass: 'bi bi-pages-content',
    label: 'Popup pages Content',
    children: [
      {
        label: 'Refresh Popup',
        route: ROUTES.REFRESH_POPUP,
      },
      {
        label: 'Place Order',
        route: ROUTES.PLACE_ORDER_POPUP,
      },
      {
        label: 'Logout',
        route: ROUTES.LOGOUT_POPUP,
      },
      {
        label: 'Cancel subscription',
        route: ROUTES.CANCEL_SUBSCRIPTION_POPUP,
      },
      {
        label: 'Topup ',
        route: ROUTES.TOPUP_POPUP,
      },
      {
        label: 'Referral',
        route: ROUTES.REFERRAL_POPUP,
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
        label: 'Hero Content',
        route: ROUTES.HERO_SECTION,
      },
      {
        label: 'As Seen On',
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
        label: 'Wallet Section',
        route: ROUTES.WALLET_SECTION,
      },
      {
        label: 'Referral Section',
        route: ROUTES.REFERRAL_SECTION,
      },
      {
        label: 'FAQ',
        route: ROUTES.FAQ_CONTENT,
      },
      {
        label: 'Auction Details Page',
        route: ROUTES.AUCTION_PAGE,
      },
      {
        label: 'Login Page',
        route: ROUTES.LOGIN_CONTENT,
      },
      {
        label: 'All Auction Page',
        route: ROUTES.ALL_AUCTIONS,
      },
      // {
      //   label: 'Profile Page',
      //   route: ROUTES.PROFILE_PAGE_CONTENT,
      // },
      // {
      //   label: 'Profile Overview',
      //   route: ROUTES.PROFILE_OVERVIEW,
      // },
      {
        label: 'User Profile Section',
        route: ROUTES.USER_PROFILE_SECTION,
      },
      {
        label: 'My Auctions',
        route: ROUTES.MY_AUCTIONS,
      },
      {
        label: 'Auction Won',
        route: ROUTES.AUCTION_WON,
      },
      // {
      //   route: ROUTES.PENNY_AUCTION_SECTION,
      //   label: 'Penny Auction Section',
      // },
      // {
      //   label: 'Auction Sections',
      //   route: ROUTES.AUCTION_SECTIONS,
      // },
      // {
      //   route: ROUTES.CURRENT_BIDS_SECTION,
      //   label: 'Current Bids Section',
      // },
      {
        label: 'Contact Us',
        route: ROUTES.CONTACTUS_CONTENT,
      },
      {
        label: 'About Us',
        route: ROUTES.ABOUT_US_CONTENT,
      },
      {
        label: 'Cookies',
        route: ROUTES.COOKIES,
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
    label: 'Companies',
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
