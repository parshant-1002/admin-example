import { onQueryStarted } from '../../../../Shared/utils/functions';
import { API_END_POINTS } from '../../Constants';
import api from '../../api';

// Define the API service
export const referralApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getReferralHistory: builder.query({
      query: ({ params }) => ({
        url: API_END_POINTS.REFERRAL_HISTORY,
        params,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
    }),
  }),
});

export const { useGetReferralHistoryQuery } = referralApi;
