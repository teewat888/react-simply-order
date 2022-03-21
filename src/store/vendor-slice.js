import { createSlice } from "@reduxjs/toolkit";
import DataService from "../lib/dataService";
import { errCatch } from "../lib/helper";

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
      state.currentVendor = { ...action.payload };
      console.log("current vendor ", state.currentVendor);
    },
    loading(state) {
      state.isLoading = true;
    },
  },
});

export const getVendors = () => {
  return (dispatch) => {
    dispatch(vendorActions.loading());
    DataService.fetchVendors()
      .then((data) => {
        console.log("fet v here");
        dispatch(vendorActions.setVendors(data.vendors));
      })
      .catch(errCatch);
  };
};

export const getAvendor = (vendorId) => {
  return (dispatch) => {
    dispatch(vendorActions.loading());
    console.log("get fetch a vendor");
    DataService.fetchVendor(vendorId)
      .then((data) => {
        dispatch(vendorActions.setCurrentVendor(data.vendor));
      })
      .catch(errCatch);
  };
};

export const vendorActions = vendorSlice.actions;

export default vendorSlice;
