import { showError, showSuccess } from "./handleDataMsg";

export const validateEmail = (dispatch, mail) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  showError(dispatch, "You have entered an invalid email address!")();
  return false;
};
