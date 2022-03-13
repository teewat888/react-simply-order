import { BASE_URL } from "./contants";

class DataService {
  //display all products belongs to user
  fetchProducts(userId, mode) {
    return fetch(BASE_URL + `/users/${userId}/products?mode=${mode}`).then(
      (resp) => resp.json()
    );
  }

  fetchVendors() {
    return fetch(BASE_URL + `/users/?role_id=2`).then((resp) => resp.json());
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
    return fetch(BASE_URL + "/user/profile", confObj).then((resp) =>
      resp.json()
    );
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
    return fetch(
      BASE_URL + `/users/${product.vendor_id}/products`,
      confObj
    ).then((resp) => resp.json());
  }

  fetchEditProduct(product) {
    const jwt = localStorage.getItem("jwt");
    const confObj = {
      method: "PATCH",
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
        },
      }),
    };
    console.log("confobj: ", confObj);
    return fetch(
      BASE_URL + `/users/${product.vendor_id}/products/${product.id}`,
      confObj
    ).then((resp) => resp.json());
  }

  fetchAddOrderTemplate(name, userId, vendorId, products) {
    const jwt = localStorage.getItem("jwt");
    const confObj = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify({
        order_template: {
          user_id: userId,
          vendor_id: vendorId,
          name: name,
          products: products,
        },
      }),
    };
    console.log("confobj: ", confObj);
    return fetch(BASE_URL + `/users/${userId}/order_templates`, confObj).then(
      (resp) => resp.json()
    );
  }
}
export default new DataService();
