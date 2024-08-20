import { onQueryStarted } from '../../../../Shared/utils/functions';
import { API_END_POINTS, HTTPS_METHODS } from '../../Constants';
import api from '../../api';

// Define the API service
export const planApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addBidPlan: builder.mutation({
      query: ({ payload }) => ({
        url: API_END_POINTS.BID_PLAN,
        method: HTTPS_METHODS.POST,
        body: payload,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
    }),
    editBidPlan: builder.mutation({
      query: ({ payload }) => ({
        url: API_END_POINTS.BID_PLAN,
        method: HTTPS_METHODS.PUT,
        body: payload,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
    }),
    deleteBidPlan: builder.mutation({
      query: ({ payload }) => ({
        url: API_END_POINTS.BID_PLAN,
        method: HTTPS_METHODS.DELETE,
        body: payload,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
    }),
    getBidPlans: builder.query({
      query: ({ params }) => ({
        url: API_END_POINTS.BID_PLAN,
        params,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
    }),
    getBidsTransactions: builder.query({
      query: ({ params }) => ({
        url: API_END_POINTS.BID_PLAN_TRANSACTION,
        params,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
    }),
  }),
});

export const {
  useAddBidPlanMutation,
  useEditBidPlanMutation,
  useDeleteBidPlanMutation,
  useGetBidPlansQuery,
  useGetBidsTransactionsQuery,
} = planApi;
