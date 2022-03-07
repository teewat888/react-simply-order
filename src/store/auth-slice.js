import { createSlice } from "@reduxjs/toolkit";

import AuthService from "../lib/authService";
import { uiActions } from "./ui-slice";

let logFlag = localStorage.getItem("jwt") ? true : false;
let role = localStorage.getItem("role")
  ? localStorage.getItem("role")
  : "customer";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: logFlag,
    user: {
      role: role,
    },
  },
  reducers: {
    login_success(state, action) {
      state.isLoggedIn = true;
      state.user.role = action.payload; //get role from the current user
    },
    login_fail(state) {
      state.isLoggedIn = false;
    },
    logout(state) {
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
          dispatch(authActions.login_success(data.user.role.name));
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
