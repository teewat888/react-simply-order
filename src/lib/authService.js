import { BASE_URL } from "../config/contants";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
import { respFunc } from "./helper";

class AuthService {
  fetchLogin(email, password) {
    const confObj = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
        },
      }),
    };
    return fetch(BASE_URL + "/user/sign_in", confObj).then(respFunc);
  }

  fetchSignup(data) {
    const confObj = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        user: data,
      }),
    };
    console.log("confobj", confObj);
    return fetch(BASE_URL + "/user/sign_up", confObj).then(respFunc);
  }

  fetchLogout() {
    const jwt = localStorage.getItem("jwt");
    const confObj = {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        Authorization: "Bearer " + jwt,
      },
    };
    return fetch(BASE_URL + "/user/sign_out", confObj).then(respFunc);
  }
}

export default new AuthService();
