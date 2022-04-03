import { createSlice } from "@reduxjs/toolkit";

import AuthService from "../lib/authService";
import { handleDataErrMsg, handleDataSuccessMsg } from "../lib/handleDataMsg";
import { errCatch } from "../lib/helper";
import { productActions } from "./product-slice";
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
    errors: {},
  },
  reducers: {
    login_success(state, action) {
      // localStorage.setItem("jwt", action.payload.jwt);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.isLoading = false;
      state.errors = {};
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
      state.errors = {};
    },
    setErrors(state, action) {
      state.errors = { ...action.payload };
    },
    clearErrors(state) {
      state.errors = {};
    },
    update(state, action) {
      state.user = { ...state.user, ...action.payload };
    },
    reset(state) {
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
      state.errors = {};
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
          dispatch(authActions.clearErrors());
        } else {
          dispatch(authActions.login_fail());
          dispatch(
            uiActions.showNotification({
              text: data.message,
              status: "error",
            })
          );
          dispatch(authActions.setErrors(data.errors));
        }
      })
      .catch(errCatch);
  };
};

export const updateProfile = (data, userId) => {
  return (dispatch) => {
    AuthService.fetchUpdateProfile(data, userId)
      .then((data) => {
        if (data.success) {
          handleDataSuccessMsg(dispatch, data)();
          dispatch(authActions.update(data.user));
        } else {
          handleDataErrMsg(dispatch, data)();
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
        dispatch(productActions.reset());
      })
      .catch((e) => {
        dispatch(authActions.logout_success()); //no matter we log you out anyway!
      });
  };
};

export const authActions = authSlice.actions;

export default authSlice;
