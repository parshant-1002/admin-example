import { onQueryStarted } from '../../../../Shared/utils/functions';
import { API_END_POINTS, HTTPS_METHODS } from '../../Constants';
import api from '../../api';

// Define the API service
export const loginApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: ({ payload }) => ({
        url: API_END_POINTS.PRODUCT,
        method: HTTPS_METHODS.POST,
        body: payload,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
    }),
    editProduct: builder.mutation({
      query: ({ payload }) => ({
        url: API_END_POINTS.PRODUCT,
        method: HTTPS_METHODS.PUT,
        body: payload,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
    }),
    deleteProduct: builder.mutation({
      query: ({ payload }) => ({
        url: API_END_POINTS.PRODUCT,
        method: HTTPS_METHODS.DELETE,
        body: payload,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
    }),
    getProducts: builder.query({
      query: ({ params }) => ({
        url: API_END_POINTS.PRODUCT,
        params,
      }),
    }),
  }),
});

export const {
  useAddProductMutation,
  useDeleteProductMutation,
  useEditProductMutation,
  useGetProductsQuery,
} = loginApi;
