import { createSlice } from "@reduxjs/toolkit";
import DataService from "../lib/dataService";
import { errCatch } from "../lib/helper";
import { delay } from "../utils/delay";

const productSlice = createSlice({
  name: "product",
  initialState: {
    productList: [],
    isLoading: false,
    fetchSuccess: false,
  },
  reducers: {
    setProducts(state, action) {
      state.productList = [...action.payload];
      state.isLoading = false;
    },
    loading(state) {
      state.isLoading = true;
    },
    setFetchFlag(state) {
      state.fetchSuccess = true;
    },
    resetFetchFlag(state) {
      state.fetchSuccess = false;
      console.log("reset flag", state.fetchSuccess);
    },
    endLoading(state) {
      state.isLoading = false;
    },
    reset(state) {
      return { ...state.initialState };
    },
  },
});

export const getProducts = (userId, mode) => {
  return (dispatch) => {
    dispatch(productActions.loading());
    dispatch(productActions.resetFetchFlag());
    console.log("doing getProducts");
    DataService.fetchProducts(userId, mode)
      .then((data) => {
        dispatch(productActions.setProducts(data.products));
        // dispatch(productActions.loading());
        // delay(1500).then(() => {
        //   dispatch(productActions.setFetchFlag());
        //   dispatch(productActions.endLoading());
        // });
        dispatch(productActions.setFetchFlag());
        console.log("set flag here");
      })
      .catch(errCatch);
  };
};

export const productActions = productSlice.actions;

export default productSlice;
