import { BASE_URL } from "../config/contants";
import {
  confObjAuth,
  confObjAuthwithBody,
  confObjwithBody,
  respFunc,
} from "./helper";

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

  fetchUpdateProfile(data, userId) {
    const body = JSON.stringify({
      user: data,
    });
    return fetch(
      BASE_URL + `/user/${userId}/update`,
      confObjAuthwithBody("PATCH", body)
    ).then(respFunc);
  }

  fetchLogout() {
    return fetch(BASE_URL + "/user/sign_out", confObjAuth("DELETE")).then(
      respFunc
    );
  }

  fetchChangePass(pass, userId) {
    const body = JSON.stringify({
      user: {
        current_password: pass.currentPass,
        password: pass.newPass,
      },
    });
    return fetch(
      BASE_URL + `/user/${userId}/change_password`,
      confObjAuthwithBody("POST", body)
    ).then(respFunc);
  }

  fetchForgotPass(email) {
    const body = JSON.stringify({
      email: email,
    });
    return fetch(
      BASE_URL + `/password/forgot`,
      confObjwithBody("POST", body)
    ).then(respFunc);
  }

  fetchResetPassword(pass, token) {
    const body = JSON.stringify({
      password: pass,
      token: token,
    });
    console.log("body", body);
    return fetch(
      BASE_URL + `/password/reset`,
      confObjwithBody("POST", body)
    ).then(respFunc);
  }
}

export default new AuthService();
