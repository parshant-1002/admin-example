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
