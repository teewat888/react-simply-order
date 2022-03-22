import { createSlice } from "@reduxjs/toolkit";
import DataService from "../lib/dataService";
import { errCatch } from "../lib/helper";

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
      state.fetchSuccess = true;
    },
    loading(state) {
      state.isLoading = true;
    },
    resetFetchFlag(state) {
      state.fetchSuccess = false;
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
    DataService.fetchProducts(userId, mode)
      .then((data) => {
        dispatch(productActions.setProducts(data.products));
      })
      .catch(errCatch);
  };
};

export const productActions = productSlice.actions;

export default productSlice;
