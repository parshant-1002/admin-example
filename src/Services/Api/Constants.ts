// eslint-disable-next-line import/prefer-default-export
export const API_BASE_URL: string = import.meta.env.VITE_BASE_URL;
export const USER_PANEL: string = import.meta.env.VITE_USER_PANEL;
export const { VITE_PRODUCT_DETAIL_PATH } = import.meta.env;
export const { VITE_API_VERSION } = import.meta.env;

export const API_END_POINTS = {
  LOGIN: '/admin/login',
  PRODUCT: '/product',
  USER: '/user',
  USER_BIDS: '/user/addBids',
  USER_PRODUCTS: '/userProducts',
  USER_INVOICES: '/user/invoices',
  BIDS_SPENT_HISTORY: '/bidSpent/history',
  AUCTION_HISTORY: '/auction/history',
  REFERRAL_HISTORY: 'referral/referredUsers',
  USER_BID_CREDIT_HISTORY: '/user/bidCreditHistory',
  UPDATE_USER: '/user/admin',
  CATEGORY: '/category',
  CONTENT: '/content',
  NOTIFICATIONS_CONTENT: '/notificationContent',
  AUCTION: '/auction',
  DASHBOARD: '/dashboard',
  AUCTION_DETAILS: '/auction/details',
  LOGOUT: '/admin/logout',
  VERIFY_OTP: '/admin/verifyOTP',
  FILE_UPLOAD: '/file/upload',
  GET_FILES: '/file/getFiles',
  FILE_DELETE: '/file/deleteFiles',
  REFERRAL_PACK: '/referralPack',
  REFERRAL_PACK_HISTORY: '/referralPack/history',
  REFERRED_USERS: '/referral/referredUsers',
  BID_PLAN: '/bidPlan',
  BID_PLAN_TRANSACTION: '/bidPlan/transactions',
  USER_PRODUCTS_INVOICE: '/userProducts/generateInvoice',
  BIDS_PLAN_INVOICE: '/bidPlan/generateInvoice',
  BID_CREDIT_INVOICE: '/user/bidCreditHistory/generateInvoice',
  NOTIFICATIONS_CLEAR_ALL: '/notification/clearNotificationHistory',
  NOTIFICATIONS_HISTORY: '/notification/fetchUserHistory',
};

export const HTTPS_METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};
