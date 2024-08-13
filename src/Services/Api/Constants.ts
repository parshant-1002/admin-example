// eslint-disable-next-line import/prefer-default-export
export const API_BASE_URL: string = import.meta.env.VITE_BASE_URL;
export const { VITE_API_VERSION } = import.meta.env;

export const API_END_POINTS = {
  LOGIN: '/admin/login',
  PRODUCT: '/product',
  USER: '/user',
  UPDATE_USER: '/user/admin',
  CATEGORY: '/category',
  LOGOUT: '/admin/logout',
  VERIFY_OTP: '/admin/verifyOTP',
  FILE_UPLOAD: '/file/upload',
  GET_FILES: '/file/getFiles',
  FILE_DELETE: '/file/deleteFiles',
  REFERRAL_PACK: '/referralPack',
  REFERRAL_PACK_HISTORY: '/referralPack/history',
  REFERRED_USERS: '/referral/referredUsers',
  USER_PRODUCTS: '/userProducts',
};

export const HTTPS_METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};
