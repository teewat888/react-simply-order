import { createSlice } from "@reduxjs/toolkit";
import { fetchLogin } from "../lib/fetchHelpers";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    jwt: "",
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.jwt = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

export const doLogin = () => {
  return (dispatch) => {
    fetchLogin()
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success === "true") {
          dispatch(authActions.login(data.jwt));
        } else {
          dispatch(authActions.login(data.jwt));
        }
      })
      .catch((e) => console.log(e));
  };
};

export const authActions = authSlice.actions;

export default authSlice;
