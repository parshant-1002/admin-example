import { API_END_POINTS } from '../../Constants';
import api from '../../api';

// Define the API service
export const transactionsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: ({ params }) => ({
        url: API_END_POINTS.TRANSACTIONS,
        params,
      }),
    }),
  }),
});

export const { useGetTransactionsQuery } = transactionsApi;
