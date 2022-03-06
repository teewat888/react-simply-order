import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../lib/fetchHelpers";

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
    fetchProducts()
      .then((resp) => resp.json())
      .then((data) => {
        dispatch(productActions.setProducts(data.products));
      })
      .catch((e) => console.log(e));
  };
};

export const productActions = productSlice.actions;

export default productSlice;
