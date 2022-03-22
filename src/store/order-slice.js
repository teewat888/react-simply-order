import { createSlice } from "@reduxjs/toolkit";
import DataService from "../lib/dataService";
import { errCatch } from "../lib/helper";
import { delay } from "../utils/delay";
import { uiActions } from "./ui-slice";
import { getAvendor } from "./vendor-slice";

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
      id: null,
    },
    editMode: false,
    fetchSuccess: false,
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
    },
    removeOrder(state, action) {
      state.orderList = state.orderList.filter(
        (order) => order.id !== action.payload
      );
    },
    loading(state) {
      state.isLoading = true;
    },
    resetFetchFlag(state) {
      state.fetchSuccess = false;
    },
    finishFetch(state) {
      state.fetchSuccess = true;
    },
    setEditMode(state) {
      state.editMode = true;
    },
    resetEditMode(state) {
      state.editMode = false;
    },
    reset(state) {
      return { ...state.initialState };
    },
  },
});

export const updateOrder = (orderId, order, userId, vendorId) => {
  return (dispatch) => {
    DataService.fetchEditOrder(orderId, order, userId, vendorId)
      .then((data) => {
        if (data.success) {
          dispatch(orderActions.setOrder(data.order));
        } else {
          dispatch(
            uiActions.showNotification({
              text: "Error comuunication with server (edit), please try again",
              status: "error",
            })
          );
        }
      })
      .catch(errCatch);
  };
};

export const getData = () => {
  return (dispatch) => {
    DataService.fetchVendor()
      .then((data) => {})
      .catch(errCatch);
  };
};
//get lis of orders
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

export const deleteOrder = (user_id, order_id) => {
  return (dispatch) => {
    dispatch(orderActions.loading);
    DataService.fetchDeleteOrder(user_id, order_id)
      .then((data) => {
        if (data.success) {
          dispatch(orderActions.removeOrder(order_id));
          dispatch(
            uiActions.showNotification({
              text: "Order deleted successfully.",
              status: "success",
            })
          );
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
// get order detail for edit/view
export const getOrder = (userId, orderId) => {
  return (dispatch) => {
    dispatch(orderActions.loading);
    DataService.fetchOrder(userId, orderId)
      .then((data) => {
        if (data.success) {
          console.log("at get order");
          dispatch(orderActions.setOrder(data.order));
          //delay(1500).then(() => dispatch(orderActions.finishFetch()));
          dispatch(orderActions.finishFetch());
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
    dispatch(getAvendor(vendor_id));
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
          delay(1500).then(() => dispatch(orderActions.finishFetch()));
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
