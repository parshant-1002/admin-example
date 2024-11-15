/* eslint-disable import/no-cycle */
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';
import type { RootState } from '../../Store';
import { setLoading } from '../../Store/Loader';
import { API_BASE_URL, VITE_API_VERSION } from './Constants';
import { ResponseOptions } from './api.d';
import { ErrorResponse } from '../../Models/Apis/Error';
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
  args: Record<string, unknown>,
  api: BaseQueryApi,
  extraOptions: object
) => {
  if (args?.showLoader !== false) {
    api.dispatch(setLoading(true));
  }
  const result = await baseQuery(args, api, extraOptions);
  if ((result as ResponseOptions).error) {
    const errorMessage = (result.error as ErrorResponse)?.data?.message;
    if ((result as ResponseOptions).error.status === 401) {
      api.dispatch(updateAuthTokenRedux({ token: null }));
    }
    toast.error(errorMessage);
    // Dispatch the logout action
  }
  if ((args as unknown as Record<string, unknown>)?.showLoader !== false) {
    api.dispatch(setLoading(false));
  }
  return result;
};

const api = createApi({
  baseQuery: baseQueryWithInterceptor as unknown as BaseQueryFn,
  endpoints: () => ({}),
});

export default api;
