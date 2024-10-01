const VERSION = import.meta.env.VITE_API_VERSION || 'v1';

const API = {
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

const API_METHODS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete',
};

const STATUS_CODES = {
  UNAUTHOURISED: 401,
  SUCCESS: 200,
};

const STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
};

const INPUT_TYPES = {
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

const blockInvalidChar = (
  e: React.KeyboardEvent<HTMLInputElement>,
  chars: string[] = []
) => {
  const invalidChars = ['e', 'E', '+', '-', ...chars];
  if (invalidChars.includes(e.key)) {
    e.preventDefault();
  }
};

const VALIDATION_REGEX = {
  OTP: /^\d{6}$/,
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PASSWORD: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d).{6,20}$/i,
  NUMBER: /\d+/g,
  SPECIAL_CHARACTERS_NOT_ALLOWED: /^[a-zA-Z0-9\s]+$/,
  SPECIAL_CHARACTERS_AND_SPACES_NOT_ALLOWED: /^[a-zA-Z0-9]+$/,
  VALID_LINK:
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9]{1,6}\b(?:[-a-zA-Z0-9@:%_+.~#?&/=]*)$/,
  USERNAME: /^[a-z0-9]+$/,
};

const IMAGE_FILE_TYPES = 'image/png,image/jpeg,image/svg,image/jpg';
const VIDEO_FILES_TYPES = 'video/mp4,video/x-m4v,video/webm,video/mov';

const STRINGS = {
  PRICE_RANGE: 'PriceRange',
  SCAN_QR_CODE:
    'Scan the qr code to get the authentication code on your authentication app',
  SELECT_DATE_RANGE: 'Select Date Range',
  PRICE: 'Price',
  NO_COLOR_SELECTED: 'No color Selected',
  HOME: 'Home',
  FILE_UPLOAD_FAILED: 'File upload failed',
  DEFAULT_VALUE: '_._',
  ARE_YOU_SURE: 'Are you sure?',
  SELECT_COLOR: 'Select Color',
  NOTIFICATIONS_TITLE: 'Notifications',
  NO_NEW_NOTIFICATION: 'No new notifications',
  PRODUCT_NOT_PURCHASED: 'Product Not Purchased',
  PENNY_AUCTION: 'Penny Auction',
  ADMIN_PANEL: 'Admin Panel',
  UPDATE_NOTIFICATION_CONTENT: 'Update Notification Content',
  UPDATE_SPECIFICATIONS: 'Update Specifications Content',
  UPDATE_REFERRAL_SECTION: 'Update Referral Content',
  UPDATE_CURRENT_BIDS_SECTION: 'Update Current Bids Section',
  UPDATE_WALLET_SECTION: 'Update Wallet Section',
  UPDATE_AUCTION_PAGE: 'Update Auction Page',
  UPDATE_PENNY_AUCTION_SECTION: 'Update Penny Auction',
  UPDATE_AUCTION_SECTION: 'Update Auction Section',
  UPDATE_CURRENT_BIDS_SEECTION: '',
  UPDATE_PROFILE_OVERVIEW: 'Update Profile Overview',
  UPDATE_USER_PROFILE_SECTION: 'Update Profile Section',
  UPDATE_PROFILE_PAGE: 'Update Profile Page',
  UPDATE_TERMS_AND_CNDTN: 'Update Terms And Condtion Content',
  UPDATE_ABOUT_US: 'Update About Us Content',
  UPDATE_COOKIES: 'Updates Cookies Policy Content',
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
  BIDS_HISTORY: 'Bids History',
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
  PLAN_DESCRIPTION: 'Plan Description',
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
  MIN_BIDS: 'Custom range min Bid',
  MAX_BIDS: 'Custom range max Bid',
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

const CONTENT_ENUMS = {
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
  ABOUT_US: 'aboutUsPage',
  AUCTION_PAGE: 'auctionPage',
  PRIVACY_POLICY: 'privacyPolicy',
  CONTACT_US_SECTION: 'contactUsSection',
  FOOTER: 'footer',
  COMPANIES_SECTION: 'companies',
  SOCIAL_CONNECT: 'socialConnect',
  BID_PACK_CONTENT: 'bidPackSection',
  TOP_AUCTION_CONTENT: 'topAuctionsSection',
  COOKIES: 'cookiePolicyPage',
  PROFILE_PAGE: 'profilePage',
  PROFILE_OVERVIEW: 'profileOverview',
  USER_PROFILE_SECTION: 'userProfileSection',
  AUCTION_SECTION: 'auctionsSection',
  PENNY_AUCTION_SECTION: 'pennyAuctionSection',
  CURRENT_BIDS_SECTION: 'currentBidsSection',
  WALLET_SECTION: 'walletSection',
  REFERRAL_SECTION: 'referralSection',
  MY_AUCTIONS_CONTENT: 'myAuction',
  AUCTION_WON_CONTENT: 'auctionWon',
  ALL_AUCTIONS_DATA: 'allAuctionsPage',
  LOGIN_CONTENT: 'loginPage',
  PLACE_ORDER_POPUP: 'placeOrderPopup',
  LOGOUT_POPUP: 'logoutPopup',
  CANCEL_SUBSCRIPTION: 'cancelSubscriptionPopup',
  TOPUP_POPUP: 'topupPopup',
  REFERRAL_POPUP: 'referralPopup',
  REFRESH_POPUP: 'refreshPopup',
  AUCTION_WON_DETAILS_CONTENT: 'auctionWonDetailsPage',
};

const BUTTON_LABELS = {
  VIEW: 'View',
  UPLOAD: ' Upload',
  CHANGE_FILE: 'Change file',
  ADD_FILE: 'Add file',
  CHOOSE_FILE: 'Choose file',
  UPDATE_SELECTION: 'Update Selection',
  SELECT_FILES: 'Select file',
  ADD_BIDS: 'ADD BIDS',
  REVOKE: 'Revoke',
  BLOCK: 'Block',
  UNBLOCK: 'Unblock',
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

const PLACEHOLDER_TEXT = {
  EMAIL: 'Enter your email',
  PASSWORD: 'Enter your password',
  CONFIRM_PASSWORD: 'Confirm your password',
};

const DATE_FORMATS = {
  FOR_DATE_RANGE: 'DD MMM  YYYY',
  DISPLAY_DATE: 'DD-MM-YYYY',
  DISPLAY_DATE_REVERSE: 'YYYY-MM-DD',
  DISPLAY_DATE_WITH_TIME: 'DD MMM YYYY  HH:mm',
};

const ALIGNMENT = {
  LEFT: 'Left',
  RIGHT: 'Right',
  CENTER: 'Center',
};

const PRIZE_TYPE = {
  1: 'Car',
  2: 'Token',
};

const TEXT_TYPES = {
  SUCCESS: 'success',
  DANGER: 'danger',
  PENDING: 'pending',
};

const SHORT_CODE_NOTE =
  'Note: Ensure there is a space before and after the shortcode.';

const FILTER_CONSTS = {
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

const SIGNATURE_MESSAGE = 'fasdkfjklandfkdsfjladsfodfafjalfadsfkads';

const STRING: string = 'Test';

const ROUTES = {
  HOMEPAGE: '/',
  LOGIN: '/login',
  OTP_FORM: '/otp-form',
  QR_CODE: '/qr-code',
  REGISTER: '/register',
  USERS: '/users',
  USERS_DETAILS: '/users/:id',
  PRODUCTS: '/products',
  PRODUCTS_LIST: '/products/list',
  CONTENT_MANAGEMENT: '/content-management',
  HEADERS_CONTENT: '/content-management/headers',
  FOOTER: '/content-management/footer',
  NOTIFICATIONS_CONTENT: '/notifications-content',
  RESERVE_PRICE_REACHED: '/notifications-content/reserve-price-reached',
  POPUP_CONENT: '/popup-content',
  LOGOUT_POPUP: '/popup-content/logout-popup',
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

  USERS: {
    path: ROUTES.USERS,
    title: 'Users',
  },
  USERS_DETAILS: {
    path: ROUTES.USERS_DETAILS,
    title: 'Users Details',
  },

  PRODUCTS_LIST: {
    path: ROUTES.PRODUCTS_LIST,
    title: 'Products',
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

  HEADERS_CONTENT: {
    path: ROUTES.HEADERS_CONTENT,
    title: 'Headers Content',
  },

  FOOTER: {
    path: ROUTES.FOOTER,
    title: 'Footer',
  },
  RESERVE_PRICE_REACHED: {
    path: ROUTES.RESERVE_PRICE_REACHED,
    title: 'Reserve Price Reached',
  },

  LOGOUT_POPUP: {
    path: ROUTES.LOGOUT_POPUP,
    title: 'Logout Popup',
  },
};

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

const CONFIRMATION_DESCRIPTION_IMAGE_DELETE = 'Are you sure you want to delete';

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
  NEW_USER_JOINED: 7,
  AUCTION_STARTED: 8,
  BID_PLAN_PURCHASED: 9,
  CONTACTED_SUPPORT: 10,
};

const CAR_BODY_TYPE = {
  SEDAN: 1,
  CROSSOVER: 2,
  SUV: 3,
  HATCHBACK: 4,
  STATION_WAGON: 5,
  COUPE: 6,
  PICKUP_TRUCK: 7,
  MINIVAN: 8,
  ROADSTER: 9,
  VAN: 10,
  SPORTS_CAR: 11,
  SUPERCAR: 12,
  LUXURY_CAR: 13,
  CONVERTIBLE: 14,
  MUSCLE_CAR: 15,
  MICROCAR: 16,
  CAMPER_VAN: 17,
  MINITRUCK: 18,
  LIMOUSINE: 19,
  TRUCK: 20,
  HOT_HATCH: 21,
  UTE: 22,
  PONY_CAR: 23,
  MILITARY_VEHICLE: 24,
  DRAGSTER: 25,
  GRAND_TOURER: 26,
  SHOOTING_BRAKE: 27,
  HOT_ROD: 28,
  LOW_RIDER: 29,
};

export {
  BID_CREDIT_TYPES,
  BID_PLAN_TYPES,
  BID_STATUS,
  CAR_BODY_TYPE,
  CONFIRMATION_DESCRIPTION_IMAGE_DELETE,
  CONFIRMATION_DESCRIPTION_INVOICE,
  FILE_TYPE,
  NOTIFICATION_TYPE,
  PRICE_RANGE,
  PRODUCT_PURCHASE_STATUS,
  REFERRAL_STATUS,
  ROUTES,
  ROUTES_CONFIG,
  TABLE_PAGE_LIMIT,
  API,
  API_METHODS,
  STATUS_CODES,
  STATUS,
  INPUT_TYPES,
  blockInvalidChar,
  VALIDATION_REGEX,
  IMAGE_FILE_TYPES,
  VIDEO_FILES_TYPES,
  STRINGS,
  CONTENT_ENUMS,
  BUTTON_LABELS,
  PLACEHOLDER_TEXT,
  DATE_FORMATS,
  ALIGNMENT,
  PRIZE_TYPE,
  TEXT_TYPES,
  SHORT_CODE_NOTE,
  FILTER_CONSTS,
  SIGNATURE_MESSAGE,
  WILDCARD_ROUTES,
  STRING,
};
