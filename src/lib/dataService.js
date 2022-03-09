import { BASE_URL } from "./contants";

class DataService {
  //display all products belongs to user
  fetchProducts(userId) {
    return fetch(BASE_URL + `/users/${userId}/products?limit=40`);
  }
  // profile info
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

  fetchAddProduct(product) {
    const jwt = localStorage.getItem("jwt");
    const confObj = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify({
        product: {
          name: product.name,
          brand: product.brand,
          unit: product.unit,
          available: product.available,
          vendor_id: product.vendor_id,
        },
      }),
    };
    console.log("confobj: ", confObj);
    return fetch(BASE_URL + `/users/${product.vendor_id}/products`, confObj);
  }
}
export default new DataService();
