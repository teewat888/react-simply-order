import { createSlice } from "@reduxjs/toolkit";

import AuthService from "../lib/authService";

let logFlag = localStorage.getItem("jwt") ? true : false;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: logFlag,
  },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
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

export const doLogin = () => {
  return (dispatch) => {
    AuthService.fetchLogin()
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("jwt", data.jwt);
          dispatch(authActions.login());
        } else {
          dispatch(authActions.login(data.jwt));
        }
      })
      .catch((e) => console.log(e));
  };
};

export const authActions = authSlice.actions;

export default authSlice;
