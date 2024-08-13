import { onQueryStarted } from '../../../../Shared/utils/functions';
import { API_END_POINTS, HTTPS_METHODS } from '../../Constants';
import api from '../../api';

// Define the API service
export const loginApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addUsers: builder.mutation({
      query: ({ payload }) => ({
        url: API_END_POINTS.USER,
        method: HTTPS_METHODS.POST,
        body: payload,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
    }),
    editUsers: builder.mutation({
      query: ({ payload }) => ({
        url: API_END_POINTS.UPDATE_USER,
        method: HTTPS_METHODS.PUT,
        body: payload,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
    }),
    deleteUsers: builder.mutation({
      query: ({ payload }) => ({
        url: API_END_POINTS.USER,
        method: HTTPS_METHODS.DELETE,
        body: payload,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
    }),
    getUsers: builder.query({
      query: ({ params }) => ({
        url: API_END_POINTS.USER,
        params,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
    }),
    addUserBids: builder.mutation({
      query: ({ payload }) => ({
        url: API_END_POINTS.USER_BIDS,
        method: HTTPS_METHODS.POST,
        body: payload,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
    }),
    getUserBidsCreditHistory: builder.query({
      query: ({ params }) => ({
        url: API_END_POINTS.USER_BID_CREDIT_HISTORY,
        params,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
    }),
    getUserProductHistory: builder.query({
      query: ({ params }) => ({
        url: API_END_POINTS.USER_PRODUCTS,
        params,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
    }),
  }),
});

export const {
  useAddUsersMutation,
  useDeleteUsersMutation,
  useEditUsersMutation,
  useGetUsersQuery,
  useAddUserBidsMutation,
  useGetUserProductHistoryQuery,
  useGetUserBidsCreditHistoryQuery,
} = loginApi;
