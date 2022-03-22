import { createSlice } from "@reduxjs/toolkit";
import DataService from "../lib/dataService";
import { errCatch } from "../lib/helper";
import { uiActions } from "./ui-slice";
import { delay } from "../utils/delay";

const templateSlice = createSlice({
  name: "template",
  initialState: {
    templateList: [],
    isLoading: false,
    createdSuccess: false,
  },
  reducers: {
    setTemplates(state, action) {
      state.templateList = [...action.payload];
      state.isLoading = false;
    },
    loading(state) {
      state.isLoading = true;
    },
    startCreate(state) {
      state.createdSuccess = false;
    },
    finishCreated(state) {
      state.createdSuccess = true;
    },
    reset(state) {
      return { ...state.initialState };
    },
  },
});

export const getTemplates = (user_id, vendor_id) => {
  return (dispatch) => {
    dispatch(templateActions.loading());
    DataService.fetchOrderTemplate(user_id, vendor_id)
      .then((data) => {
        dispatch(templateActions.setTemplates(data.templates));
      })
      .catch(errCatch);
  };
};

export const createTemplate = (
  templateName,
  user_id,
  vendor_id,
  currentProduct
) => {
  return (dispatch) => {
    DataService.fetchAddOrderTemplate(
      templateName,
      user_id,
      vendor_id,
      currentProduct
    )
      .then((data) => {
        if (data.success) {
          dispatch(
            uiActions.showNotification({
              text: "Order template created.",
              status: "success",
            })
          );
          delay(1500).then(() => dispatch(templateActions.finishCreated()));
        } else {
          dispatch(
            uiActions.showNotification({
              text: "Error when creating order template.",
              status: "error",
            })
          );
        }
        dispatch(templateActions.startCreate());
      })
      .catch(errCatch);
  };
};

export const templateActions = templateSlice.actions;

export default templateSlice;
