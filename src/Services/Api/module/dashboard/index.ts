import { API_END_POINTS } from '../../Constants';
import api from '../../api';

export const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query({
      query: ({ params }) => ({
        url: API_END_POINTS.DASHBOARD,
        params,
      }),
    }),
  }),
});
export const { useGetDashboardQuery } = dashboardApi;
