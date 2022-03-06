import { createSlice } from "@reduxjs/toolkit";

import AuthService from "../lib/authService";
import { uiActions } from "./ui-slice";

let logFlag = localStorage.getItem("jwt") ? true : false;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: logFlag,
  },
  reducers: {
    login_success(state) {
      state.isLoggedIn = true;
    },
    login_fail(state) {
      state.isLoggedIn = false;
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.removeItem("jwt");
    },
    register(state) {
      state = state;
    },
  },
});

export const doLogin = (email, password) => {
  return (dispatch) => {
    AuthService.fetchLogin(email, password)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("jwt", data.jwt);
          dispatch(authActions.login_success());
        } else {
          dispatch(authActions.login_fail());
          dispatch(uiActions.showNotification("invalid email/password"));
          setTimeout(() => {
            dispatch(uiActions.showNotification(null));
          }, 2000);
        }
      })
      .catch((e) => console.log(e));
  };
};

export const authActions = authSlice.actions;

export default authSlice;
