import { onQueryStarted } from '../../../../Shared/utils/functions';
import { API_END_POINTS, HTTPS_METHODS } from '../../Constants';
import api from '../../api';

// Define the API service
export const loginApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addReferralPack: builder.mutation({
      query: ({ payload }) => ({
        url: API_END_POINTS.REFERRAL_PACK,
        method: HTTPS_METHODS.POST,
        body: payload,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
    }),
    editReferralPack: builder.mutation({
      query: ({ payload }) => ({
        url: API_END_POINTS.REFERRAL_PACK,
        method: HTTPS_METHODS.PUT,
        body: payload,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
    }),
    deleteReferralPack: builder.mutation({
      query: ({ payload }) => ({
        url: API_END_POINTS.REFERRAL_PACK,
        method: HTTPS_METHODS.DELETE,
        body: payload,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
    }),
    getReferralPacks: builder.query({
      query: ({ params }) => ({
        url: API_END_POINTS.REFERRAL_PACK,
        params,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
    }),
    getReferralPackHistory: builder.query({
      query: ({ params }) => ({
        url: API_END_POINTS.REFERRAL_PACK_HISTORY,
        params,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
    }),
    getReferredUsers: builder.query({
      query: ({ params }) => ({
        url: API_END_POINTS.REFERRED_USERS,
        params,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
    }),
  }),
});

export const {
  useAddReferralPackMutation,
  useDeleteReferralPackMutation,
  useEditReferralPackMutation,
  useGetReferralPacksQuery,
  useGetReferralPackHistoryQuery,
  useGetReferredUsersQuery,
} = loginApi;
