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
    label: 'Content Management',
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
  // {
  //   // icon: AirDropIcon,
  //   label: 'AirDrop',
  //   // route: ROUTES.AIR_DROP,
  //   children: [
  //     {
  //       label: 'List',
  //       // route: ROUTES.AIR_DROP_LIST,
  //     },
  //     {
  //       label: 'History',
  //       // route: ROUTES.AIR_DROP_HISTORY,
  //     },
  //   ],
  // },
  // {
  //   iconClass: 'bi bi-body-text',
  //   label: 'Content Management',
  //   //   // route: ROUTES.CONTENT_MANAGEMENT,
  //   children: [
  //     {
  //       label: 'Top Header Content',
  //       route: ROUTES.TOP_NAVBAR_CONTENT,
  //     },
  //     //     {
  //     //       label: 'Video Content',
  //     //       // route: ROUTES.VIDEO_CONTENT,
  //     //     },
  //     //     {
  //     //       label: 'Prize Section Content',
  //     //       // route: ROUTES.PRIZE_SECTION_CONTENT,
  //     //     },
  //     //     {
  //     //       label: 'Winner List Content',
  //     //       // route: ROUTES.WINNER_LIST_CONTENT,
  //     //     },
  //     //     {
  //     //       label: 'Winner Rules Content',
  //     //       // route: ROUTES.WINNER_RULES_CONTENT,
  //     //     },
  //     //     {
  //     //       label: 'Contract details Content',
  //     //       // route: ROUTES.CONTRACT_DETAILS_CONTENT,
  //     //     },
  //     //     {
  //     //       label: 'Roadmap Section Content',
  //     //       // route: ROUTES.ROAD_MAP_SECTION_CONTENT,
  //     //     },
  //     //     {
  //     //       label: 'Premium Token Wallet Content',
  //     //       // route: ROUTES.PREMIUM_TOKEN_WALLET_CONTENT,
  //     //     },
  //     //     {
  //     //       label: 'Featured on Content',
  //     //       // route: ROUTES.FEATURES_CONTENT,
  //     //     },
  //     //     {
  //     //       label: 'Token Information Content',
  //     //       // route: ROUTES.TOKEN_INFORMATION_CONTENT,
  //     //     },
  //     //     {
  //     //       label: 'External Audit Content',
  //     //       // route: ROUTES.EXTERNAL_AUDIT_CONTENT,
  //     //     },
  //     //     {
  //     //       label: 'Premium Marketplace Content',
  //     //       // route: ROUTES.PREMIUM_MARKET_PLACE_CONTENT,
  //     //     },
  //     //     {
  //     //       label: 'Token Supply & Stats Content',
  //     //       // route: ROUTES.TOKEN_STATS_INFORMATION_CONTENT,
  //     //     },
  //     //     {
  //     //       label: 'Join Airdrop Content',
  //     //       // route: ROUTES.JOIN_AIRDROP_CONTENT,
  //     //     },
  //     //     // {
  //     //     //   label: 'Partners Content',
  //     //     // route: ROUTES.PARTNER_CONTENT,
  //     //     // },
  //     //     {
  //     //       label: 'Footer Content',
  //     //       // route: ROUTES.FOOTER_CONTENT,
  //     //     },
  //     //     {
  //     //       label: 'Prize Popup Content',
  //     //       // route: ROUTES.PRIZE_SECTION_POPUP_CONTENT,
  //     //     },
  //     //     {
  //     //       label: 'Privacy Policy Content',
  //     //       // route: ROUTES.PRIVACY_POLICY_PAGE_CONTENT,
  //     //     },
  //     //     {
  //     //       label: 'Term And Condition Content',
  //     //       // route: ROUTES.TERM_AND_CONDITION_PAGE_CONTENT,
  //     //     },
  //     //     {
  //     //       label: 'SEO Meta Content',
  //     //       // route: ROUTES.META_CONTENT,
  //     //     },
  //   ],
  // },
  // {
  //   iconClass: 'bi bi-currency-bitcoin',
  //   label: 'Contract Management',
  //   // route: ROUTES.WINNERS_STATS,
  //   children: [
  //     {
  //       // route: ROUTES.TOKEN_MANAGEMENT,
  //       label: 'Token management',
  //     },
  //     {
  //       // route: ROUTES.LOTTERY_MANAGEMENT,
  //       label: 'Smart Contract management',
  //     },
  //     {
  //       // route: ROUTES.WINNERS_LIST,
  //       label: 'Winners list',
  //     },
  //   ],
  // },
];

export default SIDEBAR_NAV;
