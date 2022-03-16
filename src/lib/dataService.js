import { BASE_URL } from "../config/contants";
import { respFunc } from "./helper";

class DataService {
  //display all products belongs to user
  fetchProducts(userId, mode) {
    return fetch(BASE_URL + `/users/${userId}/products?mode=${mode}`).then(
      respFunc
    );
  }

  fetchVendors() {
    return fetch(BASE_URL + `/users/?role_id=2`).then(respFunc);
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
    return fetch(BASE_URL + "/user/profile", confObj).then(respFunc);
  }
  fetchVendor(vendorId) {
    const jwt = localStorage.getItem("jwt");
    const confObj = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        Authorization: "Bearer " + jwt,
      },
    };
    return fetch(BASE_URL + `/user/vendor/${vendorId}`, confObj).then(respFunc);
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
    ).then(respFunc);
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
    ).then(respFunc);
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
      respFunc
    );
  }

  fetchOrderTemplate(userId, vendorId) {
    const jwt = localStorage.getItem("jwt");
    const confObj = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        Authorization: "Bearer " + jwt,
      },
    };
    return fetch(
      vendorId === null
        ? `${BASE_URL}/users/${userId}/order_templates`
        : `${BASE_URL}/users/${userId}/order_templates?vendor_id=${vendorId}`,
      confObj
    ).then(respFunc);
  }

  fetchAnOrderTemplate(templateId) {
    const jwt = localStorage.getItem("jwt");
    const confObj = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        Authorization: "Bearer " + jwt,
      },
    };
    return fetch(
      BASE_URL + `/user/order_form?template_id=${templateId}`,
      confObj
    ).then(respFunc);
  }
}
export default new DataService();
