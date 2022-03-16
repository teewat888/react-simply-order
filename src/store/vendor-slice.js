import { createSlice } from "@reduxjs/toolkit";
import DataService from "../lib/dataService";
import { authActions } from "./auth-slice";
import { uiActions } from "./ui-slice";

const vendorSlice = createSlice({
  name: "vendor",
  initialState: {
    vendorList: [],
    isLoading: false,
    currentVendor: {},
  },
  reducers: {
    setVendors(state, action) {
      state.vendorList = [...action.payload];
      state.isLoading = false;
    },
    setCurrentVendor(state, action) {
      state.currentVendor = action.payload;
      console.log("current vendor ", state.currentVendor);
    },
    loading(state) {
      state.isLoading = true;
    },
  },
});

export const getVendors = () => {
  console.log("dispatch getvendor call");
  return (dispatch) => {
    console.log("dispatch inside call");
    dispatch(vendorActions.loading());
    DataService.fetchVendors()
      .then((data) => {
        console.log("fet v here");
        dispatch(vendorActions.setVendors(data.vendors));
      })
      .catch((e) => {
        dispatch(
          uiActions.showNotification({
            text: e.message,
            status: "error",
          })
        );
      });
  };
};

export const getAvendor = (vendorId) => {
  return (dispatch) => {
    dispatch(vendorActions.loading());
    DataService.fetchVendor(vendorId)
      .then((data) => {
        dispatch(vendorActions.setCurrentVendor(data.vendor));
      })
      .catch((e) => {
        dispatch(
          uiActions.showNotification({
            text: e.message,
            status: "error",
          })
        );
      });
  };
};

export const vendorActions = vendorSlice.actions;

export default vendorSlice;
