import { createSlice } from "@reduxjs/toolkit";

import AuthService from "../lib/authService";
import { uiActions } from "./ui-slice";

let logFlag = localStorage.getItem("jwt") ? true : false;

let user = JSON.parse(localStorage.getItem("user"))
  ? JSON.parse(localStorage.getItem("user"))
  : {
      id: null,
      first_name: "",
      last_name: "",
      email: "",
      company_name: "",
      address_number: "",
      address_street: "",
      address_suburb: "",
      address_state: "",
      contact_number: "",
      auth_token: "",
      role: {
        id: null,
        name: "",
      },
    };

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: logFlag,
    user: user,
    isLoading: false,
  },
  reducers: {
    login_success(state, action) {
      state.isLoggedIn = true;
      state.user = user;
      state.isLoading = false;
    },
    login_fail(state) {
      state.isLoggedIn = false;
      state.isLoading = false;
    },
    loading(state) {
      state.isLoading = true;
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.clear();
    },
    logout_success(state) {
      state.isLoggedIn = false;
      localStorage.clear();
    },
    register(state) {
      state = state;
    },
  },
});

export const doLogin = (email, password) => {
  return (dispatch) => {
    dispatch(authActions.loading());
    AuthService.fetchLogin(email, password)
      .then((data) => {
        if (data.success) {
          localStorage.setItem("jwt", data.jwt);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch(authActions.login_success(data.user));
        } else {
          dispatch(authActions.login_fail());
          dispatch(
            uiActions.showNotification({
              text: "invalid email/password",
              status: "error",
            })
          );
        }
      })
      .catch((e) => {
        dispatch(
          uiActions.showNotification({
            text: e.message,
            status: "error",
          })
        );
      });
  };
};
export const doLogout = () => {
  return (dispatch) => {
    AuthService.fetchLogout()
      .then((data) => {
        if (data.success) {
          dispatch(authActions.logout_success());
        } else {
          dispatch(
            uiActions.showNotification({
              text: "Error: can not sign out this time",
              status: "error",
            })
          );
        }
      })
      .catch((e) => {
        dispatch(
          uiActions.showNotification({
            text: e.message,
            status: "error",
          })
        );
      });
  };
};

export const authActions = authSlice.actions;

export default authSlice;
