import { createSlice } from '@reduxjs/toolkit';

const uploadedImages = createSlice({
  name: 'uploadedImages',
  initialState: { images: null },
  reducers: {
    updateUploadedImages: (state, action) => ({
      ...state,
      images: action.payload,
    }),
  },
});

export const { updateUploadedImages } = uploadedImages.actions;

export default uploadedImages.reducer;
