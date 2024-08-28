import { onQueryStarted } from '../../../../Shared/utils/functions';
import { API_END_POINTS, HTTPS_METHODS } from '../../Constants';
import api from '../../api';

export const notificationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    notifications: builder.query({
      query: ({ params }) => ({
        url: API_END_POINTS.NOTIFICATIONS_HISTORY,
        params,
      }),
    }),

    clearAllNotifications: builder.mutation({
      query: ({ payload }) => ({
        url: API_END_POINTS.NOTIFICATIONS_CLEAR_ALL,
        method: HTTPS_METHODS.PUT,
        body: payload,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
    }),
  }),
  overrideExisting: false,
});

export const { useNotificationsQuery, useClearAllNotificationsMutation } =
  notificationApi;
