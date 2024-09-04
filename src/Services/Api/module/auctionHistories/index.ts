import { onQueryStarted } from '../../../../Shared/utils/functions';
import { API_END_POINTS } from '../../Constants';
import api from '../../api';

// Define the API service
export const auctionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBidsSpentHistory: builder.query({
      query: ({ params }) => ({
        url: API_END_POINTS.BIDS_SPENT_HISTORY,
        params,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
    }),
    getAuctionHistory: builder.query({
      query: ({ params }) => ({
        url: API_END_POINTS.AUCTION_HISTORY,
        params,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
    }),
  }),
});

export const { useGetBidsSpentHistoryQuery, useGetAuctionHistoryQuery } =
  auctionApi;
