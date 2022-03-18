import { createSlice } from "@reduxjs/toolkit";
import DataService from "../lib/dataService";
import { errCatch } from "../lib/helper";
import { authActions } from "./auth-slice";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderDetails: [],
    isLoading: false,
    order: {
      order_date: "",
      delivery_date: "",
      order_ref: "",
      comment: "",
      user_id: null,
      vendor_id: null,
      order_details: [],
    },
    changed: false,
  },
  reducers: {
    setOrderDetails(state, action) {
      state.orderDetails = [...action.payload];
      state.isLoading = false;
    },
    setOrder(state, action) {
      state.order = [...action.payload];
      state.isLoading = false;
    },
    loading(state) {
      state.isLoading = true;
    },
  },
});

export const sendData = () => {
  return (dispatch) => {
    DataService.fetchVendor()
      .then((data) => {})
      .catch(errCatch);
  };
};

export const orderActions = orderSlice.actions;

export default orderSlice;
