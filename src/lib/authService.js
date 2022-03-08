import { BASE_URL } from "./contants";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";

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
    return fetch(BASE_URL + "/user/sign_in", confObj);
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
    return fetch(BASE_URL + "/user/sign_out", confObj);
  }
}

export default new AuthService();
