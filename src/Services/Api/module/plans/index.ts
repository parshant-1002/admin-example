import { onQueryStarted } from '../../../../Shared/utils/functions';
import { API_END_POINTS, HTTPS_METHODS } from '../../Constants';
import api from '../../api';

// Define the API service
export const loginApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addPlan: builder.mutation({
      query: ({ payload }) => ({
        url: API_END_POINTS.PLANS.ADD,
        method: HTTPS_METHODS.POST,
        body: payload,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
    }),
    editPlan: builder.mutation({
      query: ({ payload }) => ({
        url: `${API_END_POINTS.PLANS.EDIT}/${payload?.id}`,

        method: HTTPS_METHODS.PUT,
        body: payload,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
    }),
    deletePlan: builder.mutation({
      query: ({ payload }) => ({
        url: `${API_END_POINTS.PLANS.DELETE}/${payload}`,
        method: HTTPS_METHODS.DELETE,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
    }),
    getPlans: builder.query({
      query: ({ params }) => ({
        url: API_END_POINTS.PLANS.LIST,
        params,
      }),
    }),
    getPlan: builder.query({
      query: ({ params }) => ({
        url: API_END_POINTS.PLANS.GET_SINGLE,
        params,
      }),
    }),
  }),
});

export const {
  useAddPlanMutation,
  useDeletePlanMutation,
  useEditPlanMutation,
  useGetPlansQuery,
} = loginApi;