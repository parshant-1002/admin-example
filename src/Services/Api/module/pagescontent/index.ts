import { onQueryStarted } from '../../../../Shared/utils/functions';
import { API_END_POINTS, HTTPS_METHODS } from '../../Constants';
import api from '../../api';

// Define the API service
export const loginApi = api.injectEndpoints({
  endpoints: (builder) => ({
    updateContent: builder.mutation({
      query: ({ payload }) => ({
        url: API_END_POINTS.CONTENT,
        method: HTTPS_METHODS.PUT,
        body: payload,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
    }),
    getContent: builder.query({
      query: ({ params }) => ({
        url: API_END_POINTS.CONTENT,
        params,
      }),
    }),
  }),
});

export const { useGetContentQuery, useUpdateContentMutation } = loginApi;
