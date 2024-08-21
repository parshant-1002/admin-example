import { onQueryStarted } from '../../../../Shared/utils/functions';
import { API_END_POINTS, HTTPS_METHODS } from '../../Constants';
import api from '../../api';

export const auctionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addAuction: builder.mutation({
      query: ({ payload }) => ({
        url: API_END_POINTS.AUCTION,
        method: HTTPS_METHODS.POST,
        body: payload,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
    }),
    editAuction: builder.mutation({
      query: ({ payload }) => ({
        url: API_END_POINTS.AUCTION,
        method: HTTPS_METHODS.PUT,
        body: payload,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
    }),
    deleteAuction: builder.mutation({
      query: ({ payload }) => ({
        url: API_END_POINTS.AUCTION,
        method: HTTPS_METHODS.DELETE,
        body: payload,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
    }),

    getAuctions: builder.query({
      query: ({ params }) => ({
        url: API_END_POINTS.AUCTION,
        params,
      }),
    }),
    getAuctionDetails: builder.query({
      query: ({ params }) => ({
        url: API_END_POINTS.AUCTION_DETAILS,
        params,
      }),
    }),
    getAuctionBidHistory: builder.query({
      query: ({ params }) => ({
        url: API_END_POINTS.BIDS_SPENT_HISTORY,
        params,
      }),
    }),
  }),
});
export const {
  useAddAuctionMutation,
  useDeleteAuctionMutation,
  useEditAuctionMutation,
  useGetAuctionsQuery,
  useGetAuctionDetailsQuery,
  useGetAuctionBidHistoryQuery,
} = auctionApi;
