import { BASE_URL } from "./contants";

class DataService {
  fetchProducts(userId) {
    return fetch(BASE_URL + `/users/${userId}/products?limit=40`);
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
