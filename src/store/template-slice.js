import { createSlice } from "@reduxjs/toolkit";
import DataService from "../lib/dataService";
import { errCatch } from "../lib/helper";
import { uiActions } from "./ui-slice";
import { delay } from "../utils/delay";
import { handleDataErrMsg, handleDataSuccessMsg } from "../lib/handleDataMsg";

const templateSlice = createSlice({
  name: "template",
  initialState: {
    templateList: [],
    isLoading: false,
    fetchSuccess: false,
    templateDetails: {},
    editMode: false,
  },
  reducers: {
    setTemplates(state, action) {
      state.templateList = [...action.payload];
      state.isLoading = false;
    },
    setTemplate(state, action) {
      state.templateDetails = { ...action.payload };
      state.isLoading = false;
      console.log("template_details: ", state.templateDetails);
    },
    loading(state) {
      state.isLoading = true;
      console.log("state loading->", state.isLoading);
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
    setEditMode(state) {
      state.editMode = true;
    },
    resetEditMode(state) {
      state.editMode = false;
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

export const getTemplate = (userId, templateId) => {
  return (dispatch) => {
    dispatch(templateActions.loading());
    DataService.fetchTemplate(userId, templateId)
      .then((data) => {
        if (data.success) {
          dispatch(templateActions.setTemplate(data.template_details));
          dispatch(templateActions.loading());
          delay(1500).then(() => {
            dispatch(templateActions.setFetchFlag());
            handleDataSuccessMsg(dispatch, data)();
            dispatch(templateActions.endLoading());
          });
        } else {
          handleDataErrMsg(dispatch, data)();
        }
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
          handleDataSuccessMsg(dispatch, data)();
          delay(1500).then(() => dispatch(templateActions.setFetchFlag()));
          dispatch(templateActions.setFetchFlag());
        } else {
          handleDataErrMsg(dispatch, data)();
        }
        dispatch(templateActions.resetFetchFlag());
      })
      .catch(errCatch);
  };
};

export const editTemplate = (
  userId,
  templateId,
  templateName,
  templateDetails
) => {
  return (dispatch) => {
    dispatch(templateActions.loading());
    DataService.fetchEditTemplate(
      userId,
      templateId,
      templateName,
      templateDetails
    )
      .then((data) => {
        if (data.success) {
          handleDataSuccessMsg(dispatch, data)();
          delay(1500).then(() => dispatch(templateActions.setEditMode()));
        } else {
          handleDataErrMsg(dispatch, data)();
        }
        dispatch(templateActions.resetEditMode());
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
          handleDataSuccessMsg(dispatch, data)();
          delay(1000).then(() => {
            dispatch(uiActions.clear());
          });
        } else {
          handleDataErrMsg(dispatch, data)();
        }
      })
      .catch(errCatch);
  };
};

export const templateActions = templateSlice.actions;

export default templateSlice;
