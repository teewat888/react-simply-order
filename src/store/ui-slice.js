import { createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { delay } from "../utils/delay";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    message: {
      text: null,
      status: "error",
    },
  },
  reducers: {
    showNotification(state, action) {
      state.message.text = action.payload.text;
      state.message.status = action.payload.status;
    },
    clear(state) {
      state.message = {
        text: null,
        status: "error",
      };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
