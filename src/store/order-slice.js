import { createSlice } from "@reduxjs/toolkit";
import DataService from "../lib/dataService";
import { authActions } from "./auth-slice";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderDetails: [],
    isLoading: false,
  },
  reducers: {
    setOrder(state, action) {
      state.orderDetails = [...action.payload];
      state.isLoading = false;
    },
    loading(state) {
      state.isLoading = true;
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice;
