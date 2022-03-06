import { BASE_URL } from "./contants";

export const fetchProducts = () => {
  console.log(BASE_URL);
  return fetch(BASE_URL + "/products?limit=40");
};

export const fetchLogin = () => {
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
};
