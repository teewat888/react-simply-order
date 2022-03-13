import { createSlice } from "@reduxjs/toolkit";
import DataService from "../lib/dataService";

const templateSlice = createSlice({
  name: "order",
  initialState: {
    templateList: [],
    isLoading: false,
  },
  reducers: {
    addSuccess(state, action) {
      state.templateList = [...action.payload];
      state.isLoading = false;
    },
    loading(state) {
      state.isLoading = true;
    },
  },
});

export const addTemplate = (name, userId, vendorId, products) => {
  return (dispatch) => {
    dispatch(templateActions.loading());
    DataService.fetchAddOrderTemplate(name, userId, vendorId, products)
      .then((data) => {
        dispatch(productActions.setProducts(data.products));
      })
      .catch((e) => console.log(e));
  };
};

export const templateActions = templateSlice.actions;

export default templateSlice;
