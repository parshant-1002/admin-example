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
  TOTAL_SUPPLY: 'Total Supply',
  NEXT_BTN: 'next-btn',
  PREV_BTN: 'pre-btn',
  ACTIVE: 'active',
  DISABLED: 'disabled',
  EMPTY_STRING: '',
  NO_RESULT: 'No Search result found!',
  WINNER_LIST: 'Winner List',
  NEXT_WINNER_DRAWN_AT: 'Next winner will be drawn at',
  LAST_WINNER_DRAWN_AT: 'Last winner drawn at',
  DIFFERENCE: 'Difference',
  FIRST_WINNER: '1st Winner',
  DRAWN: 'Status',
  DRAW: 'Draw',
  DRAWN_TYPE: 'Drawn Type',
};

export const CONTENT_ENUMS = {
  HEADER: 'headers',
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
};

export const BUTTON_LABELS = {
  ADD_BIDS: 'Add Bids',
  REVOKE: 'Revoke',
  YES: 'yes',
  NO: 'No',
  CANCEL: 'Cancel',
  DELETE: 'Delete',
  ADD_MORE: 'Add more',
  SAVE: 'Save',
  CLEAR: 'Clear',
  DOWNLOAD_CSV: 'Download csv ',
  EDIT: 'Edit',
  ADD: 'Add',
};
export const PLACEHOLDER_TEXT = {
  EMAIL: 'Enter your email',
  PASSWORD: 'Enter your password',
  CONFIRM_PASSWORD: 'Confirm your password',
};

export const DATE_FORMATS = {
  FOR_DATE_RANGE: 'DD MMM  YYYY',
  DISPLAY_DATE: 'DD-MM-YYYY',
  DISPLAY_DATE_WITH_TIME: 'DD-MM-YYYY, HH:mm',
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
  USERS_DETAILS: '/users-details/:id',
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
};

const WILDCARD_ROUTES = {
  PUBLIC: ROUTES.LOGIN,
  PRIVATE: ROUTES.HOMEPAGE,
};

const ROUTES_CONFIG = {
  HOMEPAGE: {
    path: ROUTES.HOMEPAGE,
    title: 'Welcome To Dashboard',
  },
  PRODUCTS: {
    path: ROUTES.PRODUCTS,
    title: 'Product',
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
};

export { ROUTES, WILDCARD_ROUTES, ROUTES_CONFIG };
