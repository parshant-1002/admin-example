import { onQueryStarted } from '../../../../Shared/utils/functions';
import api from '../../api';
import { API_END_POINTS } from '../../Constants';

export const invoicesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getInvoices: builder.query({
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

export const { useGetInvoicesQuery } = invoicesApi;
