import { uiActions } from "../store/ui-slice";

export const handleDataErrMsg = (dispatch, data) => {
  return () => {
    dispatch(
      uiActions.showNotification({
        text: data.message,
        status: "error",
      })
    );
  };
};

export const handleDataSuccessMsg = (dispatch, data) => {
  return () => {
    dispatch(
      uiActions.showNotification({
        text: data.message,
        status: "success",
      })
    );
  };
};

export const showSuccess = (dispatch, data) => {
  return () => {
    dispatch(
      uiActions.showNotification({
        text: data,
        status: "success",
      })
    );
  };
};
export const showError = (dispatch, data) => {
  return () => {
    dispatch(
      uiActions.showNotification({
        text: data,
        status: "error",
      })
    );
  };
};
