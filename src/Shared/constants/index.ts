const VERSION = import.meta.env.VITE_API_VERSION || 'v1';
export const API = {
  BASE_URL: import.meta.env.VITE_BASE_URL,
  GET_CONTENT_DATA: `/${VERSION}/getContentForAdminPanel`,
  UPDATE_CONTENT_DATA: `/${VERSION}/content`,
  LOGIN: `${VERSION}/admin/login`,
  RESET_PASSWORD: `${VERSION}/admin/resetPassword`,
  CHANGE_PASSWORD: `${VERSION}/admin/changePassword`,
  FORGOT_PASSWORD: `${VERSION}/admin/forgot-password`,
  UPDATE_PASSWORD: `${VERSION}/admin/changePassword`,
  UPLOAD_MEDIA: `${VERSION}/file/upload`,
  DELETE_MEDIA: `${VERSION}/file/deleteFiles`,
  UPDATE_MEDIA: `${VERSION}/file/update`,
  GET_MEDIA: `${VERSION}/file/getFiles`,
  GET_SOLANA_DATA: `${VERSION}/solanaData`,
  REFRESH_SOLANA_DATA: `${VERSION}/solanaData`,
  REFRESH_USER_TOKEN: `${VERSION}/refreshUsersToken`,
  GET_STATISTICS: `${VERSION}/dashboard`,
  GET_TRANSACTION: `${VERSION}/transactions`,
  WINNER_SELECTION: `${VERSION}/winnerSelection`,
  WINNERS: `${VERSION}/winners`,
  GET_USERS_LIST_FOR_AIRDROP: `${VERSION}/whitelistAirdrop`,
  POST_AIRDROP_TRANSACTION: `${VERSION}/airdrop`,
  GET_AIRDROP_HISTORY: `${VERSION}/airdropHistory`,
  GET_USERS: `${VERSION}/admin/getAllUsers`,
  GET_CONTRACT_CONFIG: `${VERSION}/config`,
  UPDATE_CONTRACT_CONFIG: `${VERSION}/config`,
  GET_AUTH_MESSAGE: `${VERSION}/getAuthMessage`,
  SEND_TOKEN_SUCCESS: `${VERSION}/admin/prizeStatusUpdate`,
};

export const API_METHODS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete',
};

export const STATUS_CODES = {
  UNAUTHOURISED: 401,
  SUCCESS: 200,
};

export const STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
};

export enum FilterOrder {
  ASCENDING = -1,
  DESCENDING = 1,
}

export const INPUT_TYPES = {
  TEXT: 'text',
  TEXT_AREA: 'textarea',
  DATE: 'date',
  NUMBER: 'number',
  EMAIL: 'email',
  PASSWORD: 'password',
  SELECT: 'select',
  RICH_TEXT: 'rich-text',
  FILE_UPLOAD: 'file-upload',
  FILE: 'file',
  SWITCH: 'switch',
  PHONE: 'phone',
  CHECKBOX: 'checkbox',
  COLOR: 'color',
};

export const blockInvalidChar = (
  e: React.KeyboardEvent<HTMLInputElement>,
  chars: string[] = []
) => {
  const invalidChars = ['e', 'E', '+', '-', ...chars];
  if (invalidChars.includes(e.key)) {
    e.preventDefault();
  }
};

export const VALIDATION_REGEX = {
  OTP: /^\d{6}$/,
  EMAIL: /^\S+@\S+\.\S+$/,
  PASSWORD: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,20}$/i,
  NUMBER: /\d+/g,
  SPECIAL_CHARACTERS_NOT_ALLOWED: /^[a-zA-Z0-9\s]+$/,
  SPECIAL_CHARACTERS_AND_SPACES_NOT_ALLOWED: /^[a-zA-Z0-9]+$/,
  VALID_LINK:
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)$/,
  USERNAME: /^[a-z0-9]+$/,
};

export const IMAGE_FILE_TYPES = 'image/png,image/jpeg,image/svg,image/jpg';
export const VIDEO_FILES_TYPES = 'video/mp4,video/x-m4v,video/webm,video/mov';

export const STRINGS = {
  UPDATE_NOTIFICATION_CONTENT: 'Update Notification Content',
  UPDATE_TERMS_AND_CNDTN: 'Update Terms And Condtion Content',
  UPDATE_PRIVACY_AND_POLICY: 'Update Privacy Policy Content',
  REGULAR: 'Regular',
  SPECIFICATIONS: 'Specifications',
  DROP_FILE_HERE: 'Drop file here',
  NO_FILES_FOUND: 'No files found',
  TOTAL_SUPPLY: 'Total Supply',
  NEXT_BTN: 'next-btn',
  PREV_BTN: 'pre-btn',
  ACTIVE: 'active',
  DISABLED: 'disabled',
  EMPTY_STRING: '',
  NO_RESULT: 'No Result Found!',
  WINNER_LIST: 'Winner List',
  NEXT_WINNER_DRAWN_AT: 'Next winner will be drawn at',
  LAST_WINNER_DRAWN_AT: 'Last winner drawn at',
  DIFFERENCE: 'Difference',
  FIRST_WINNER: '1st Winner',
  DRAWN: 'Status',
  DRAW: 'Draw',
  DRAWN_TYPE: 'Drawn Type',
  ARE_YOU_SURE_YOU_WANT_TO_DELETE: 'Are you sure you want to delete this?',
  EDIT_REFERRAL_PACK: 'Edit Referral Pack',
  ADD_REFERRAL_PACK: 'Add Referral Pack',
  UPDATE: 'Update',
  DELETE: 'Delete',
  ADD: 'Add',
  VIEW: 'View',
  AUCTION_ID: 'Auction Id',
  AUCTION_LINK: 'Auction Link',
  AUCTION_NAME: 'Auction Name',
  P_ID: 'P.ID',
  P_NAME: 'P.Name',
  PURCHASED_DATE: 'Purchased Date',
  BID_TYPE: 'Bid Type',
  INVOICE_DATE: 'Invoice Date',
  BID_PRICE: 'Bid Price (SEK)',
  USERNAME: 'Username',
  EMAIL: 'Email',
  INVOICE: 'Invoice',
  GENERATE: 'Generate',
  PACK_ID: 'Pack Id',
  PACK_NAME: 'Pack Name',
  DEAL_PRICE: 'Deal Price (SEK)',
  DEAL_PRICE_LABEL: 'Deal Price',
  IMAGE: 'Image',
  BIDS_RECEIVED: 'Bids Received',
  REFERRAL_ID: 'Id',
  NAME: 'Name',
  BIDS_GIVEN: 'Bids Given',
  REFEREE_BIDS_PURCHASED: 'Referee Bids Purchased',
  START_DATE: 'Start Date',
  STATUS: 'Status',
  ACTIONS: 'Actions',
  REFERRER_NAME: 'Referrer Name',
  REFERRER_EMAIL: 'Referrer Email',
  REWARDS: 'Rewards',
  REFEREE_EMAIL: 'Referee Email',
  REWARD_AT: 'Reward At',
  REFERRAL_DATE: 'Referral Date',
  COMPLETED: 'Completed',
  PENDING: 'Pending',
  USER_DELETED: 'User Deleted',
  PLAN_ID: 'Id',
  PLAN_NAME: 'Plan Name',
  CREATED_AT: 'Created At',
  CLOSED_AT: 'Closed At',
  REFERRALS: 'Referrals',
  ID: 'ID',
  END_AT: 'End At',
  HOT_DEAL: 'Hot Deal',
  BID_PLAN_TYPE: 'Plan Type',
  YES: 'YES',
  CUSTOM: 'Custom',
  NO: 'NO',
  T_ID: 'TId',
  DEAL_OFFER: 'Deal Offer',
  FAILED: 'Failed',
  DATE: 'Date',
  BIDS_CREDITED: 'Bids Credited',
  DISCOUNT_PERCENTAGE: 'Discount Percentage (upto 100)',
  BIDS_CONVERSION: 'Conversion Price (SEK)',
  DISCOUNT_OFFER_PRICE: 'Discounted Offer Price',
  MONTHLY_PRICE: 'Monthly Price (SEK)',
  YEARLY_PRICE: 'Yearly Price (SEK)',
  END_DATE: 'End Date',
  TRANSACTIONS: 'Transactions',
  ADD_BID_PLAN: 'Add Bid Plan',
  EDIT_BID_PLAN: 'Edit Bid Plan',
  BID_SPENT: 'Bid Spent (SEK)',
  ITEM_PRICE: 'Item Price (SEK)',
  PRODUCT_ID: 'Product Id',
  PRODUCT_NAME: 'Product Name',
  PRODUCT_PRICE: 'Product Price (SEK)',
  REFERRER_ID: 'Referrer Id',
  CONFIRMED: 'Confirmed',
  REFUNDED: 'Refunded',
  PURCHASE: 'Purchase',
  GIFT: 'Gift',
  REFERRAL: 'Referral',
  SIGNUP_BONUS: 'Signup Bonus',
  REFUND: 'Refund',
};

export const CONTENT_ENUMS = {
  HEADER: 'header',
  PRIZE: 'prizeSection',
  ROADMAP: 'roadmapSection',
  PREMIUM_TOKEN_WALLET: 'premiumTokenWallet',
  WINNER_RULES: 'winnerRulesSection',
  VIDEO_SECTION: 'videoSection',
  WINNER_LIST_SECTION: 'winnerListSection',
  WINNER_RULES_SECTION: 'winnerRulesSection',
  CONTRACT_DETAILS: 'contractDetails',
  FEATURES: 'featureSection',
  TOKEN_INFO: 'tokenInfo',
  PREMIUM_MARKETPLACE: 'premiumMarketPlace',
  TOKEN_INFORMATION: 'tokenInformation',
  EXTERNAL_AUDIT: 'externalAudit',
  TOKEN_SUPPLY: 'tokenSupply',
  JOIN_AIRDROP: 'joinAirdrop',
  PARTNERS: 'partners',
  FOOTERS: 'footers',
  WINNER_POPUPS: 'winnerPopUps',
  PRIVACY_POLICY_PAGE: 'privacyPolicy',
  TERM_AND_CONDITION_PAGE: 'termAndCondition',
  META_CONTENT: 'metaSection',
  FAQS_SECTION: 'faqSection',
  HERO_SECTION: 'heroSection',
  LANDING_PAGE: 'landingPage',
  HOW_IT_WORKS_SECTION: 'howItWorksSection',
  HOW_IT_WORKS: 'howItWorks',
  CONTACT_US: 'contactUs',
  TERMS_AND_CONDITIONS: 'termsAndConditions',
  PRIVACY_POLICY: 'privacyPolicy',
  CONTACT_US_SECTION: 'contactUsSection',
  FOOTER: 'footer',
  COMPANIES_SECTION: 'companies',
  SOCIAL_CONNECT: 'socialConnect',
  BID_PACK_CONTENT: 'bidPackSection',
  TOP_AUCTION_CONTENT: 'topAuctionsSection',
};

export const BUTTON_LABELS = {
  VIEW: 'View',
  UPLOAD: ' Upload',
  CHANGE_FILE: 'Change file',
  CHOOSE_FILE: 'Choose file',
  UPDATE_SELECTION: 'Update Selection',
  SELECT_FILES: 'Select file',
  ADD_BIDS: 'ADD BIDS',
  REVOKE: 'Revoke',
  YES: 'Yes',
  NO: 'No',
  CANCEL: 'Cancel',
  DELETE: 'Delete',
  DELETE_SELECTION: 'Delete Selection',
  ADD_MORE: 'Add more',
  SAVE: 'Save',
  CLEAR: 'Clear',
  DOWNLOAD_CSV: 'Download csv ',
  EDIT: 'SAVE',
  ADD: 'ADD',
  DELETE_ALL: 'Delete all',
  CLEAR_ALL: 'Clear all',
  APPLY: 'Apply',
};
export const PLACEHOLDER_TEXT = {
  EMAIL: 'Enter your email',
  PASSWORD: 'Enter your password',
  CONFIRM_PASSWORD: 'Confirm your password',
};

export const DATE_FORMATS = {
  FOR_DATE_RANGE: 'DD MMM  YYYY',
  DISPLAY_DATE: 'DD-MM-YYYY',
  DISPLAY_DATE_REVERSE: 'YYYY-MM-DD',
  DISPLAY_DATE_WITH_TIME: 'DD MMM YYYY  HH:mm',
};

export const ALIGNMENT = {
  LEFT: 'Left',
  RIGHT: 'Right',
  CENTER: 'Center',
};

export const PRIZE_TYPE = {
  1: 'Car',
  2: 'Token',
};

export const TEXT_TYPES = {
  SUCCESS: 'success',
  DANGER: 'danger',
  PENDING: 'pending',
};

export const SHORT_CODE_NOTE =
  'Note: Ensure there is a space before and after the shortcode.';

export const FILTER_CONSTS = {
  day: 'day',
  days: 'days',
  year: 'year',
  month: 'month',
  months: 'months',
  dateFormat: 'YYYY-MM-DD',
  six: 6,
  one: 1,
  Statistics: 'Statistics',
  adminStatistics: 'Admin Stats',
  Asc: '1',
  Desc: '-1',
  noDataFound: 'No Data Found',
  selectCasinoLimit: 'Select Casino Limit',
  totalRequests: 'Total Requests',
  averageHourlyHandling: 'Average Hourly Handling',
  addedCustomerIds: 'Customer ID added',
  adminName: 'Name',
  defaultSortKey: 'approvedRequestCount',
};

/* Constants for RPC Connection the Solana Blockchain */
// const COMMITMENT_LEVEL = 'processed';
// export const ENDPOINT =
//   import.meta.env.VITE_NEXT_PUBLIC_ALCHEMY_RPC_URL ||
//   clusterApiUrl(
//     import.meta.env.VITE_ENVIRONMENT === 'production'
//       ? 'mainnet-beta'
//       : 'devnet'
//   );
// export const connection = new Connection(ENDPOINT, COMMITMENT_LEVEL);

export const SIGNATURE_MESSAGE = 'fasdkfjklandfkdsfjladsfodfafjalfadsfkads';

const STRING: string = 'Test';
export { STRING };

const ROUTES = {
  HOMEPAGE: '/',
  LOGIN: '/login',
  OTP_FORM: '/otp-form',
  QR_CODE: '/qr-code',
  REGISTER: '/register',
  ABOUT: '/about-us',
  USERS: '/users',
  USERS_DETAILS: '/users/:id',
  PRODUCTS: '/products',
  CATEGORIES: '/categories',
  PRODUCTS_ADD: '/products/add',
  PRODUCTS_LIST: '/products/list',
  VERIFY_EMAIL: '/verify-email',
  FORGOT_PASSWORD: '/forgot/password',
  RESET_PASSWORD: '/auth/reset-password/:token',
  WINNERS: '/winners',
  WINNERS_STATS: '/contract/stats',
  TOKEN_MANAGEMENT: '/contract/token-management',
  LOTTERY_MANAGEMENT: '/contract/lottery-management',
  WINNERS_LIST: '/winners/list',
  CONTENT_MANAGEMENT: '/content-management',
  HEADERS_CONTENT: '/content-management/headers',
  HOW_IT_WORKS_CONTENT: '/content-management/how-it-works',
  FQA_CONTENT: '/content-management/faqs',
  CONTACTUS_CONTENT: '/content-management/contact-us',
  TERM_AND_CONDITION_CONTENT: '/content-management/terms-and-condition',
  PRIVACY_POLICY_CONTENT: '/content-management/privacy-policy',
  COMPANIES_CONTENT: '/content-management/companies-content',
  TOP_NAVBAR_CONTENT: '/content-management/top-navbar-content',
  VIDEO_CONTENT: '/content-management/video-content',
  PRIZE_SECTION_CONTENT: '/content-management/prize-section-content',
  WINNER_LIST_CONTENT: '/content-management/winner-list-content',
  WINNER_RULES_CONTENT: '/content-management/winner-rules-content',
  CONTRACT_DETAILS_CONTENT: '/content-management/contract-details-content',
  ROAD_MAP_SECTION_CONTENT: '/content-management/roadmap-section-content',
  FEATURES_CONTENT: '/content-management/features-content',
  TOKEN_INFORMATION_CONTENT: '/content-management/token-information-content',
  PREMIUM_MARKET_PLACE_CONTENT:
    '/content-management/premium-marketplace-content',
  PREMIUM_TOKEN_WALLET_CONTENT:
    '/content-management/premium-token-wallet-content',
  TOKEN_STATS_INFORMATION_CONTENT:
    '/content-management/token-stats-info-content',
  BID_PACK_SECTION: '/content-management/bid-pack-content',
  HERO_SECTION: '/content-management/hero-content',
  TOP_AUCTION_SECTION: '/content-management/top-auctions-section',
  FOOTER: '/content-management/footer',
  EXTERNAL_AUDIT_CONTENT: '/content-management/external-audit-content',
  TOKEN_SUPPLY_CONTENT: '/content-management/token-supply-content',
  JOIN_AIRDROP_CONTENT: '/content-management/join-airdrop-content',
  PARTNER_CONTENT: '/content-management/partners-content',
  FOOTER_CONTENT: '/content-management/footer-content',
  AIR_DROP: '/air-drop',
  AIR_DROP_LIST: '/air-drop/list',
  AIR_DROP_HISTORY: '/air-drop/history',
  PRIZE_SECTION_POPUP_CONTENT: '/prize-section/pop-up-content',
  PRIVACY_POLICY_PAGE_CONTENT: '/pages/privacy-policy-page-content',
  TERM_AND_CONDITION_PAGE_CONTENT: '/pages/term-and-condition-page-content',
  META_CONTENT: '/pages/meta-content',
  CHANGE_PASSWORD: '/change-password',
  MANUAL_TRANSFER: '/manual-transfer',
  MANUAL_TRANSFER_LIST: '/manual-transfer/manual-transfer-list',
  INVOICES_AUCTION: '/invoices/auction',
  INVOICES_PURCHASE: '/invoices/purchase',
  CREATE_REFERRAL: '/create-referral',
  REFERRAL_LISTING: '/referral-listing',
  BIDS_PLANS: '/bids-plans',
  AUCTION_MANAGEMENT: '/auction-management',
  AUCTION_DETAILS: '/auction-management/auction-details',
  TRANSACTIONS_PLANS_HISTORY: '/transactions/plans-history',
  TRANSACTIONS_BIDS_HISTORY: '/transactions/bids-history',
  TRANSACTIONS_PRODUCTS_HISTORY: '/transactions/products-history',
  TRANSACTIONS_REFERRAL_HISTORY: '/transactions/referral-history',
  // notifications content
  NOTIFICATIONS_CONTENT: '/notifications-content',
  RESERVE_PRICE_REACHED: '/notifications-content/reserve-price-reached',
  NEW_BID_PLACED: '/notifications-content/new-bid-placed',
  AUTOMATIC_BID_RUNNED_OUT: '/notifications-content/automatic-bid-runned-out',
  BID_TIME_LEFT: '/notifications-content/bid-time-left',
  WINNER: '/notifications-content/winner',
  AUCTION_ENDED: '/notifications-content/auction-ended',
};

const WILDCARD_ROUTES = {
  PUBLIC: ROUTES.LOGIN,
  PRIVATE: ROUTES.HOMEPAGE,
};

const ROUTES_CONFIG = {
  AUCTION_DETAILS: {
    path: `${ROUTES.AUCTION_DETAILS}/:id`,
    title: 'Auction Details',
  },
  AUCTION_MANAGEMENT: {
    path: ROUTES.AUCTION_MANAGEMENT,
    title: 'Products for Auction',
  },
  HOMEPAGE: {
    path: ROUTES.HOMEPAGE,
    title: 'Welcome To Dashboard',
  },
  PRODUCTS: {
    path: ROUTES.PRODUCTS,
    title: 'Product',
  },
  INVOICES_AUCTION: {
    path: ROUTES.INVOICES_AUCTION,
    title: 'Auction Invoices',
  },
  INVOICES_PURCHASE: {
    path: ROUTES.INVOICES_PURCHASE,
    title: 'Purchase Invoices',
  },
  CATEGORIES: {
    path: ROUTES.CATEGORIES,
    title: 'Categories',
  },
  USERS: {
    path: ROUTES.USERS,
    title: 'Users',
  },
  USERS_DETAILS: {
    path: ROUTES.USERS_DETAILS,
    title: 'Users Details',
  },
  PRODUCTS_ADD: {
    path: ROUTES.PRODUCTS_ADD,
    title: 'Add Product',
  },
  PRODUCTS_LIST: {
    path: ROUTES.PRODUCTS_LIST,
    title: 'Products',
  },
  VERIFY_EMAIL: {
    path: ROUTES.VERIFY_EMAIL,
    title: 'Verify Email',
  },
  RESET_PASSWORD: {
    path: ROUTES.RESET_PASSWORD,
    title: 'Reset Password',
  },
  LOGIN: {
    path: ROUTES.LOGIN,
    title: 'Login',
  },
  OTP_FORM: {
    path: ROUTES.OTP_FORM,
    title: 'Otp',
  },
  QR_CODE: {
    path: ROUTES.QR_CODE,
    title: 'Qr Code',
  },
  REGISTER: {
    path: ROUTES.REGISTER,
    title: 'Register',
  },
  ABOUT: {
    path: ROUTES.ABOUT,
    title: 'About us',
  },
  // Referral
  CREATE_REFERRAL: {
    path: ROUTES.CREATE_REFERRAL,
    title: 'Create Referral',
  },
  REFERRAL_LISTING: {
    path: ROUTES.REFERRAL_LISTING,
    title: 'Referral Listing',
  },
  BIDS_PLANS: {
    path: ROUTES.BIDS_PLANS,
    title: 'Bids Plans',
  },
  // Transactions
  TRANSACTIONS_PLANS_HISTORY: {
    path: ROUTES.TRANSACTIONS_PLANS_HISTORY,
    title: 'Plans History',
  },
  TRANSACTIONS_BIDS_HISTORY: {
    path: ROUTES.TRANSACTIONS_BIDS_HISTORY,
    title: 'Bids History',
  },
  TRANSACTIONS_PRODUCTS_HISTORY: {
    path: ROUTES.TRANSACTIONS_PRODUCTS_HISTORY,
    title: 'Products History',
  },
  TRANSACTIONS_REFERRAL_HISTORY: {
    path: ROUTES.TRANSACTIONS_REFERRAL_HISTORY,
    title: 'Referral History',
  },
  HEADERS_CONTENT: {
    path: ROUTES.HEADERS_CONTENT,
    title: 'Headers Content',
  },
  FAQS_CONTENT: {
    path: ROUTES.FQA_CONTENT,
    title: 'Faqs Content',
  },
  HOW_IT_WORKS_CONTENT: {
    path: ROUTES.HOW_IT_WORKS_CONTENT,
    title: 'How It Works Content',
  },
  CONTACTUS_CONTENT: {
    path: ROUTES.CONTACTUS_CONTENT,
    title: 'Contact US Content',
  },
  TERMS_AND_CONDITION_CONTENT: {
    path: ROUTES.TERM_AND_CONDITION_CONTENT,
    title: 'Term and Condition Content',
  },
  PRIVACY_POLICY_CONTENT: {
    path: ROUTES.PRIVACY_POLICY_CONTENT,
    title: 'Privacy Policy Content',
  },
  COMPANIES_CONTENT: {
    path: ROUTES.COMPANIES_CONTENT,
    title: 'As Seen On Content',
  },
  BID_PACK_SECTION: {
    path: ROUTES.BID_PACK_SECTION,
    title: 'Bid Pack Content',
  },
  HERO_SECTION: {
    path: ROUTES.HERO_SECTION,
    title: 'Hero Section Content',
  },
  TOP_AUCTION_SECTION: {
    path: ROUTES.TOP_AUCTION_SECTION,
    title: 'Top Auction Content',
  },
  FOOTER: {
    path: ROUTES.FOOTER,
    title: 'Footer',
  },
  RESERVE_PRICE_REACHED: {
    path: ROUTES.RESERVE_PRICE_REACHED,
    title: 'Reserve Price Reached',
  },
  NEW_BID_PLACED: {
    path: ROUTES.NEW_BID_PLACED,
    title: 'New Bid Placed',
  },
  AUTOMATIC_BID_RUNNED_OUT: {
    path: ROUTES.AUTOMATIC_BID_RUNNED_OUT,
    title: 'Automatic Bid Runed Out',
  },
  BID_TIME_LEFT: {
    path: ROUTES.BID_TIME_LEFT,
    title: 'Bid Time Left',
  },
  WINNER: {
    path: ROUTES.WINNER,
    title: 'Winner',
  },
  AUCTION_ENDED: {
    path: ROUTES.AUCTION_ENDED,
    title: 'Auction Ended',
  },
};

enum POPUPTYPES {
  NONE = 'NONE',
  EDIT = 'EDIT',
  ADD = 'ADD',
  DELETE = 'DELETE',
}

const REFERRAL_STATUS = {
  PENDING: 1,
  COMPLETED: 2,
  USER_DELETED_BEFORE_COMPLETION: 3,
};

const PRODUCT_PURCHASE_STATUS = {
  PENDING: 1, // awaiting bidding
  PURCHASED: 2, // bidding active
  EXPIRED: 3, // bidding ended
};

const BID_PLAN_TYPES = {
  REGULAR: 1,
  CUSTOM: 2,
};

const BID_STATUS = {
  CONFIRMED: 1,
  REFUNDED: 2,
};

const BID_CREDIT_TYPES = {
  PURCHASE: 1,
  ADMIN_GIFT: 2,
  REFERRAL: 3,
  SIGNUP_BONUS: 4,
  REFUND: 5,
};

const PRICE_RANGE = {
  min: 0,
  max: 10000000,
};

const TABLE_PAGE_LIMIT = 10;

const CONFIRMATION_DESCRIPTION_INVOICE =
  'Are you sure you want to generate invoice';

const TOAST_MESSAGES = (...arg: (string | number)[]) => ({
  SELECT_ATLEAST_ONE_FILE: 'Please select at least one file.',
  PLEASE_CHOOSE_ONLY_ACCEPTED_FILES: `Please choose only ${arg[0]} file.`,
  PLEASE_UPLOAD_ONLY_ACCEPTED_FILES: `Please upload only ${arg[0]} file.`,
  IMAGE_RATIO_ERROR: `Please select image of ratio ${arg[0]}:${arg[1]}`,
});
const FILE_TYPE: {
  CMS?: string;
  PRODUCT?: string;
  AUCTION?: string;
} = {
  CMS: '1',
  PRODUCT: '2',
  AUCTION: '2',
};

const NOTIFICATION_TYPE = {
  RESERVE_PRICE_REACHED: 1,
  NEW_BID_PLACED: 2,
  AUTOMATIC_BID_RUNNED_OUT: 3,
  BID_TIME_LEFT: 4,
  WINNER: 5,
  AUCTION_ENDED: 6,
};
export {
  BID_CREDIT_TYPES,
  BID_PLAN_TYPES,
  BID_STATUS,
  CONFIRMATION_DESCRIPTION_INVOICE,
  FILE_TYPE,
  POPUPTYPES,
  PRICE_RANGE,
  PRODUCT_PURCHASE_STATUS,
  REFERRAL_STATUS,
  ROUTES,
  ROUTES_CONFIG,
  TABLE_PAGE_LIMIT,
  TOAST_MESSAGES,
  WILDCARD_ROUTES,
  NOTIFICATION_TYPE,
};
