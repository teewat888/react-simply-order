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
    fetchSuccess: false,
  },
  reducers: {
    setTemplates(state, action) {
      state.templateList = [...action.payload];
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
    removeTemplate(state, action) {
      state.templateList = state.templateList.filter(
        (template) => template.id !== action.payload
      );
    },
    endLoading(state) {
      state.isLoading = false;
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
              text: data.message,
              status: "success",
            })
          );
          delay(1500).then(() => dispatch(templateActions.setFetchFlag()));
        } else {
          dispatch(
            uiActions.showNotification({
              text: data.message,
              status: "error",
            })
          );
        }
        dispatch(templateActions.resetFetchFlag());
      })
      .catch(errCatch);
  };
};

export const deleteTemplate = (userId, templateId) => {
  return (dispatch) => {
    DataService.fetchDeleteTemplate(userId, templateId)
      .then((data) => {
        if (data.success) {
          dispatch(templateActions.removeTemplate(templateId));
          dispatch(
            uiActions.showNotification({
              text: data.message,
              status: "success",
            })
          );
          delay(1000).then(() => {
            dispatch(
              uiActions.showNotification({
                text: "",
                status: "error",
              })
            );
          });
        } else {
          dispatch(
            uiActions.showNotification({
              text: data.message,
              status: "error",
            })
          );
        }
      })
      .catch(errCatch);
  };
};

export const templateActions = templateSlice.actions;

export default templateSlice;
