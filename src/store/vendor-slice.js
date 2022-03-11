import { createSlice } from "@reduxjs/toolkit";
import DataService from "../lib/dataService";
import { authActions } from "./auth-slice";

const vendorSlice = createSlice({
  name: "vendor",
  initialState: {
    vendorList: [],
    isLoading: false,
  },
  reducers: {
    setVendors(state, action) {
      state.vendorList = [...action.payload];
      state.isLoading = false;
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
      .catch((e) => console.log(e));
  };
};

export const vendorActions = vendorSlice.actions;

export default vendorSlice;