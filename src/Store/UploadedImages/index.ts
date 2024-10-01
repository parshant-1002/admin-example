import { createSlice } from '@reduxjs/toolkit';

const uploadedImages = createSlice({
  name: 'uploadedImages',
  initialState: { images: null, deletedIds: null },
  reducers: {
    updateUploadedImages: (state, action) => ({
      ...state,
      images: action.payload,
    }),
    deletedImages: (state, action) => ({
      ...state,
      deletedIds: action.payload,
    }),
  },
});

export const { updateUploadedImages, deletedImages } = uploadedImages.actions;

export default uploadedImages.reducer;
