import { BASE_URL } from "./contants";

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
}

export default new AuthService();
