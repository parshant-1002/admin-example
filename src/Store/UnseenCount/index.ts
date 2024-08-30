import { createSlice } from '@reduxjs/toolkit';

const unseenCount = createSlice({
  name: 'unseenCount',
  initialState: { count: 0 },
  reducers: {
    setUnseenCount: (state, action) => ({
      ...state,
      count: action.payload,
    }),
  },
});

export const { setUnseenCount } = unseenCount.actions;

export default unseenCount.reducer;
