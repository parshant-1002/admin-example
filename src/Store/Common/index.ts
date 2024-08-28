import { createSlice } from '@reduxjs/toolkit';

const common = createSlice({
  name: 'common',
  initialState: { token: null, userData: null, deviceToken: null },
  reducers: {
    updateAuthTokenRedux: (state, action) => ({
      ...state,
      token: action.payload.token,
    }),
    updateUserDataRedux: (state, action) => ({
      ...state,
      userData: action.payload.userData,
    }),
    updateDeviceTokenRedux: (state, action) => ({
      ...state,
      deviceToken: action.payload,
    }),
  },
});

export const {
  updateAuthTokenRedux,
  updateUserDataRedux,
  updateDeviceTokenRedux,
} = common.actions;

export default common.reducer;
