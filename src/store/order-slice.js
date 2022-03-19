import { createSlice } from "@reduxjs/toolkit";
import DataService from "../lib/dataService";
import { errCatch } from "../lib/helper";
import { delay } from "../utils/delay";
import { uiActions } from "./ui-slice";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderList: [],
    isLoading: false,
    order: {
      order_date: "",
      delivery_date: "",
      order_ref: "",
      comment: "",
      user_id: null,
      vendor_id: null,
      order_details: [],
      success: null,
    },
    changed: false,
    createdSuccess: false,
  },
  reducers: {
    setOrderList(state, action) {
      state.orderList = [...action.payload];
      state.isLoading = false;
    },
    setOrder(state, action) {
      console.log("action payload", action.payload);
      state.order = { ...action.payload };
      state.isLoading = false;
      state.finishCreate = true;
    },
    loading(state) {
      state.isLoading = true;
    },
    startCreate(state) {
      state.createdSuccess = false;
    },
    finishCreated(state) {
      state.createdSuccess = true;
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

export const getOrders = (user_id) => {
  return (dispatch) => {
    dispatch(orderActions.loading);
    DataService.fetchOrders(user_id)
      .then((data) => {
        if (data.success) {
          dispatch(orderActions.setOrderList(data.orders));
        } else {
          dispatch(
            uiActions.showNotification({
              text: "Error finding orders, please try again",
              status: "error",
            })
          );
        }
      })
      .catch(errCatch);
  };
};

export const createOrder = (user_id, vendor_id, template_id) => {
  return (dispatch) => {
    dispatch(orderActions.loading);
    DataService.fetchAddOrder(user_id, vendor_id, template_id)
      .then((data) => {
        if (data.success) {
          dispatch(
            uiActions.showNotification({
              text: "Order successfully created.",
              status: "success",
            })
          );
          dispatch(orderActions.setOrder(data));
          delay(1500).then(() => dispatch(orderActions.finishCreated()));
        } else {
          dispatch(
            uiActions.showNotification({
              text: "Error creating order, please try again",
              status: "error",
            })
          );
        }
      })
      .catch(errCatch);
  };
};

export const orderActions = orderSlice.actions;

export default orderSlice;
