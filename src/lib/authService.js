import { BASE_URL } from "./contants";

class AuthService {
  fetchLogin() {
    const confObj = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        user: {
          email: "teewat@yahoo.com",
          password: "1111",
        },
      }),
    };
    return fetch(BASE_URL + "/user/sign_in", confObj);
  }
}

export default new AuthService();
