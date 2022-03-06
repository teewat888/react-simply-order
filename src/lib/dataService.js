import { BASE_URL } from "./contants";

class DataService {
  fetchProducts() {
    console.log(BASE_URL);
    return fetch(BASE_URL + "/products?limit=40");
  }
  fetchProfile() {
    const jwt = localStorage.getItem("jwt");
    const confObj = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        Authorization: "Bearer " + jwt,
      },
    };
    return fetch(BASE_URL + "/user/profile", confObj);
  }
}
export default new DataService();
