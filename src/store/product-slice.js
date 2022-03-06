import { createSlice } from "@reduxjs/toolkit";
import DataService from "../lib/dataService";

const productSlice = createSlice({
  name: "product",
  initialState: {
    productList: [],
  },
  reducers: {
    setProducts(state, action) {
      state.productList = [...action.payload];
    },
  },
});

export const getProducts = () => {
  return (dispatch) => {
    DataService.fetchProducts()
      .then((resp) => resp.json())
      .then((data) => {
        dispatch(productActions.setProducts(data.products));
      })
      .catch((e) => console.log(e));
  };
};

export const productActions = productSlice.actions;

export default productSlice;
