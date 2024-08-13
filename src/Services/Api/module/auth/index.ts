import { onQueryStarted } from '../../../../Shared/utils/functions';
import { API_END_POINTS, HTTPS_METHODS } from '../../Constants';
import api from '../../api';

// Define the API service
export const loginApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ payload }) => ({
        url: API_END_POINTS.LOGIN,
        method: HTTPS_METHODS.POST,
        body: payload,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
      // Optionally add some hooks or custom logic here
    }),
    logout: builder.mutation({
      query: ({ payload }) => ({
        url: API_END_POINTS.LOGOUT,
        method: HTTPS_METHODS.POST,
        body: payload,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
      // Optionally add some hooks or custom logic here
    }),
    verifyOtp: builder.mutation({
      query: ({ payload }) => ({
        url: API_END_POINTS.VERIFY_OTP,
        method: HTTPS_METHODS.POST,
        body: payload,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
      // Optionally add some hooks or custom logic here
    }),
    // verify: builder.mutation({
    //   query: (credentials) => ({
    //     url: API_END_POINTS.VERIFY,
    //     method: HTTPS_METHODS.POST,
    //     body: credentials,
    //   }),
    //   // Optionally add some hooks or custom logic here
    // }),
    // forgotPassword: builder.mutation({
    //   query: (data) => ({
    //     url: API_END_POINTS.PASSWORD.FORGET,
    //     method: HTTPS_METHODS.POST,
    //     body: data,
    //   }),
    // }),
    // resetPassword: builder.mutation({
    //   query: ({ token = '', ...data }) => ({
    //     url: API_END_POINTS.PASSWORD.RESET,
    //     method: HTTPS_METHODS.POST,
    //     body: data,
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `${token}`,
    //     },
    //   }),
    // }),
    // logoutPassWord: builder.mutation({
    //   query: () => ({
    //     url: API_END_POINTS.LOGOUT,
    //     method: HTTPS_METHODS.POST,
    //   }),
    // }),
    // Other endpoints
  }),
});

export const {
  useLoginMutation,
  useVerifyOtpMutation,
  useLogoutMutation,
  //   useRegisterMutation,
  //   useVerifyMutation,
  //   useForgotPasswordMutation,
  //   useResetPasswordMutation,
  //   useLogoutPassWordMutation,
} = loginApi;
