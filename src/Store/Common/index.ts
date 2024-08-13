import { createSlice } from '@reduxjs/toolkit';

const common = createSlice({
  name: 'common',
  initialState: { token: null, userData: null },
  reducers: {
    updateAuthTokenRedux: (state, action) => ({
      ...state,
      token: action.payload.token,
    }),
    updateUserDataRedux: (state, action) => ({
      ...state,
      userData: action.payload.userData,
    }),
  },
});

export const { updateAuthTokenRedux, updateUserDataRedux } = common.actions;

export default common.reducer;
