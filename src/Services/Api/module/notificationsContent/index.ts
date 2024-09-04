import { onQueryStarted } from '../../../../Shared/utils/functions';
import { API_END_POINTS, HTTPS_METHODS } from '../../Constants';
import api from '../../api';

// Define the API service
export const loginApi = api.injectEndpoints({
  endpoints: (builder) => ({
    updateNotificationContent: builder.mutation({
      query: ({ payload }) => ({
        url: API_END_POINTS.NOTIFICATIONS_CONTENT,
        method: HTTPS_METHODS.PUT,
        body: payload,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
    }),
    getNotificationContent: builder.query({
      query: ({ params }) => ({
        url: API_END_POINTS.NOTIFICATIONS_CONTENT,
        params,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
    }),
  }),
});

export const {
  useGetNotificationContentQuery,
  useUpdateNotificationContentMutation,
} = loginApi;
