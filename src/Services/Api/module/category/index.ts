import { onQueryStarted } from '../../../../Shared/utils/functions';
import { API_END_POINTS, HTTPS_METHODS } from '../../Constants';
import api from '../../api';

// Define the API service
export const loginApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addCategory: builder.mutation({
      query: ({ payload }) => ({
        url: API_END_POINTS.CATEGORY,
        method: HTTPS_METHODS.POST,
        body: payload,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
    }),
    editCategory: builder.mutation({
      query: ({ payload }) => ({
        url: API_END_POINTS.CATEGORY,
        method: HTTPS_METHODS.PUT,
        body: payload,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
    }),
    deleteCategory: builder.mutation({
      query: ({ payload }) => ({
        url: API_END_POINTS.CATEGORY,
        method: HTTPS_METHODS.DELETE,
        body: payload,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
    }),
    getCategorys: builder.query({
      query: ({ params }) => ({
        url: API_END_POINTS.CATEGORY,
        params,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
  useGetCategorysQuery,
} = loginApi;
