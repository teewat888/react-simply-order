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
