// eslint-disable-next-line import/prefer-default-export
export const API_BASE_URL: string = import.meta.env.VITE_BASE_URL;

export const API_END_POINTS = {
  LOGIN: '/admin/login',
  VERIFY_OTP: '/admin/verifyOTP',
};

export const HTTPS_METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};
