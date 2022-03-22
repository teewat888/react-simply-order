import { createSlice } from "@reduxjs/toolkit";

import AuthService from "../lib/authService";
import { errCatch } from "../lib/helper";
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
      // localStorage.setItem("jwt", action.payload.jwt);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.isLoading = false;
    },
    login_fail(state) {
      state.isLoggedIn = false;
      state.isLoading = false;
    },
    loading(state) {
      state.isLoading = true;
    },
    logout_success(state) {
      state.isLoggedIn = false;
      localStorage.clear();
      state.user = {
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
          dispatch(authActions.login_success(data));
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
      .catch(errCatch);
  };
};

export const doSignup = (data) => {
  return (dispatch) => {
    dispatch(authActions.loading());
    AuthService.fetchSignup(data)
      .then((data) => {
        if (data.success) {
          dispatch(authActions.login_success(data));
          dispatch(
            uiActions.showNotification({
              text: "Successfully sign up.",
              status: "success",
            })
          );
        } else {
          dispatch(authActions.login_fail());
          dispatch(
            uiActions.showNotification({
              text: "There is an error to sign up.",
              status: "error",
            })
          );
        }
      })
      .catch(errCatch);
  };
};

export const doLogout = () => {
  return (dispatch) => {
    AuthService.fetchLogout()
      .then(() => {
        dispatch(authActions.logout_success());
      })
      .catch((e) => {
        dispatch(authActions.logout_success());
      });
  };
};

export const authActions = authSlice.actions;

export default authSlice;
