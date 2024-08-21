import { onQueryStarted } from '../../../../Shared/utils/functions';
import { API_END_POINTS, HTTPS_METHODS } from '../../Constants';
import api from '../../api';

// Define the API service
export const loginApi = api.injectEndpoints({
  endpoints: (builder) => ({
    fileUpload: builder.mutation({
      query: ({ payload }) => {
        return {
          url: API_END_POINTS.FILE_UPLOAD,
          method: HTTPS_METHODS.POST,
          body: payload,
        };
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
      // Optionally add some hooks or custom logic here
    }),
    fileDelete: builder.mutation({
      query: ({ payload }) => {
        return {
          url: API_END_POINTS.FILE_DELETE,
          method: HTTPS_METHODS.DELETE,
          body: payload,
        };
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
      // Optionally add some hooks or custom logic here
    }),
    getFiles: builder.query({
      query: ({ params }) => ({
        url: API_END_POINTS.GET_FILES,
        params,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        onQueryStarted(arg, { queryFulfilled });
      },
    }),
  }),
});

export const {
  useFileUploadMutation,
  useGetFilesQuery,
  useFileDeleteMutation,
} = loginApi;
