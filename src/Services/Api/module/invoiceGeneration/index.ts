import { onQueryStarted } from '../../../../Shared/utils/functions';
import { API_END_POINTS, HTTPS_METHODS } from '../../Constants';
import api from '../../api';

// Define the API service
export const invoiceGeneration = api.injectEndpoints({
  endpoints: (builder) => ({
    userProductsInvoiceGeneration: builder.mutation({
      query: ({ payload }) => {
        return {
          url: API_END_POINTS.USER_PRODUCTS_INVOICE,
          method: HTTPS_METHODS.POST,
          body: payload,
        };
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
      // Optionally add some hooks or custom logic here
    }),
    bidsPlanInvoiceGeneration: builder.mutation({
      query: ({ payload }) => {
        return {
          url: API_END_POINTS.BIDS_PLAN_INVOICE,
          method: HTTPS_METHODS.POST,
          body: payload,
        };
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
      // Optionally add some hooks or custom logic here
    }),
    bidsCreditInvoiceGeneration: builder.mutation({
      query: ({ payload }) => {
        return {
          url: API_END_POINTS.BID_CREDIT_INVOICE,
          method: HTTPS_METHODS.POST,
          body: payload,
        };
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
      // Optionally add some hooks or custom logic here
    }),
  }),
});

export const {
  useBidsCreditInvoiceGenerationMutation,
  useBidsPlanInvoiceGenerationMutation,
  useUserProductsInvoiceGenerationMutation,
} = invoiceGeneration;
