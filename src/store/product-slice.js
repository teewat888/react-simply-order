import { createSlice } from "@reduxjs/toolkit";
import DataService from "../lib/dataService";
import { authActions } from "./auth-slice";

const productSlice = createSlice({
  name: "product",
  initialState: {
    productList: [],
    isLoading: false,
  },
  reducers: {
    setProducts(state, action) {
      state.productList = [...action.payload];
      state.isLoading = false;
    },
    loading(state) {
      state.isLoading = true;
    },
  },
});

export const getProducts = (userId, mode) => {
  return (dispatch) => {
    dispatch(productActions.loading());
    DataService.fetchProducts(userId, mode)
      .then((data) => {
        dispatch(productActions.setProducts(data.products));
      })
      .catch((e) => console.log(e));
  };
};

export const productActions = productSlice.actions;

export default productSlice;
