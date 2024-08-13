/* eslint-disable import/no-cycle */
import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  BaseQueryApi,
} from '@reduxjs/toolkit/query/react';
import type { RootState } from '../../Store';
import { API_BASE_URL, VITE_API_VERSION } from './Constants';
import { ResponseOptions } from './api.d';
import { setLoading } from '../../Store/Loader';
import { updateAuthTokenRedux } from '../../Store/Common';

const baseQuery: BaseQueryFn = fetchBaseQuery({
  baseUrl: API_BASE_URL + VITE_API_VERSION,
  prepareHeaders: async (headers: Headers, { getState }) => {
    const { token } = (getState() as RootState).common;
    if (token) {
      headers.append('authorization', `${token}`);
    }
    return headers;
  },
});

const baseQueryWithInterceptor = async (
  args: unknown,
  api: BaseQueryApi,
  extraOptions: object
) => {
  if ((args as unknown as Record<string, unknown>)?.showLoader !== false) {
    api.dispatch(setLoading(true));
  }
  const result = await baseQuery(args, api, extraOptions);
  if (
    (result as ResponseOptions).error &&
    (result as ResponseOptions).error.status === 401
  ) {
    // Dispatch the logout action
    api.dispatch(updateAuthTokenRedux({ token: null }));
  }
  if ((args as unknown as Record<string, unknown>)?.showLoader !== false) {
    api.dispatch(setLoading(false));
  }
  return result;
};

const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
});

export default api;
