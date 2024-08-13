// import { ROUTES } from '../../../constants/routes';

import { ROUTES } from '../../../constants';

const SIDEBAR_NAV = [
  {
    iconClass: 'bi bi-grid',
    label: 'Dashboard',
    route: ROUTES.HOMEPAGE,
  },
  {
    iconClass: 'bi bi-person-lines-fill',
    label: 'Users',
    route: ROUTES.USERS,
  },
  {
    iconClass: 'bi bi-person-lines-fill',
    label: 'Categories',
    route: ROUTES.CATEGORIES,
  },
  {
    iconClass: 'bi bi-person-lines-fill',
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
    iconClass: 'bi bi-person-lines-fill',
    label: 'Invoices',
    children: [
      {
        label: 'Auction',
        route: ROUTES.INVOICES_AUCTION,
      },
      {
        label: 'Purchase',
        route: ROUTES.INVOICES_PURCHASE,
      },
    ],
  },
  {
    iconClass: 'bi bi-person-lines-fill',
    label: 'Referral',
    children: [
      {
        label: 'Create Referral',
        route: ROUTES.CREATE_REFERRAL,
      },
      // {
      //   label: 'Referral Listing',
      //   route: ROUTES.REFERRAL_LISTING,
      // },
    ],
  },
  {
    iconClass: 'bi bi-person-lines-fill',
    label: 'Bids Plans',
    children: [
      {
        label: 'Plans',
        route: ROUTES.BIDS_PLANS,
      },
      // {
      //   label: 'Referral Listing',
      //   route: ROUTES.REFERRAL_LISTING,
      // },
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
