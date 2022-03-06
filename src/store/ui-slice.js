import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    message: null,
  },
  reducers: {
    showNotification(state, action) {
      state.message = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
