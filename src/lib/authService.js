import { BASE_URL } from "../config/contants";
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
}

export default new AuthService();
