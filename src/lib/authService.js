import { BASE_URL } from "../config/contants";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
import { confObjAuth, confObjAuthwithBody, respFunc } from "./helper";

class AuthService {
  fetchLogin(email, password) {
    const body = JSON.stringify({
      user: {
        email: email,
        password: password,
      },
    });
    return fetch(
      BASE_URL + "/user/sign_in",
      confObjAuthwithBody("POST", body)
    ).then(respFunc);
  }

  fetchSignup(data) {
    const body = JSON.stringify({
      user: data,
    });
    return fetch(
      BASE_URL + "/user/sign_up",
      confObjAuthwithBody("POST", body)
    ).then(respFunc);
  }

  fetchLogout() {
    return fetch(BASE_URL + "/user/sign_out", confObjAuth("DELETE")).then(
      respFunc
    );
  }
}

export default new AuthService();
