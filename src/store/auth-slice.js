import { createSlice } from "@reduxjs/toolkit";

import AuthService from "../lib/authService";
import { uiActions } from "./ui-slice";

let logFlag = localStorage.getItem("jwt") ? true : false;
let role = localStorage.getItem("role")
  ? localStorage.getItem("role")
  : "customer";
let user_id = localStorage.getItem("user_id")
  ? localStorage.getItem("user_id")
  : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: logFlag,
    user: {
      id: user_id,
      role: role,
    },
  },
  reducers: {
    login_success(state, action) {
      state.isLoggedIn = true;
      state.user.role = action.payload.role.name; //get role from the current user
      state.user.id = action.payload.id;
    },
    login_fail(state) {
      state.isLoggedIn = false;
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.removeItem("jwt");
      localStorage.removeItem("role");
    },
    logout_success(state) {
      state.isLoggedIn = false;
      localStorage.removeItem("jwt");
      localStorage.removeItem("role");
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
          localStorage.setItem("role", data.user.role.name);
          localStorage.setItem("user_id", data.user.id);
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
      .catch((e) => console.log(e));
  };
};
export const doLogout = () => {
  return (dispatch) => {
    AuthService.fetchLogout()
      .then((resp) => resp.json())
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
      .catch((e) => console.log(e));
  };
};

export const authActions = authSlice.actions;

export default authSlice;
