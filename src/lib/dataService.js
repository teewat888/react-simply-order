import { BASE_URL } from "../config/contants";
import { confObjAuth, confObjAuthwithBody, respFunc } from "./helper";

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
    return fetch(BASE_URL + "/user/profile", confObjAuth("GET")).then(respFunc);
  }

  fetchVendor(vendorId) {
    return fetch(
      BASE_URL + `/user/vendor/${vendorId}`,
      confObjAuth("GET")
    ).then(respFunc);
  }

  fetchAddProduct(product) {
    const body = JSON.stringify({
      product: {
        name: product.name,
        brand: product.brand,
        unit: product.unit,
        available: product.available,
        vendor_id: product.vendor_id,
      },
    });
    return fetch(
      BASE_URL + `/users/${product.vendor_id}/products`,
      confObjAuthwithBody("POST", body)
    ).then(respFunc);
  }

  fetchEditProduct(product) {
    const body = JSON.stringify({
      product: {
        name: product.name,
        brand: product.brand,
        unit: product.unit,
        available: product.available,
      },
    });
    return fetch(
      BASE_URL + `/users/${product.vendor_id}/products/${product.id}`,
      confObjAuthwithBody("PATCH", body)
    ).then(respFunc);
  }

  fetchAddOrderTemplate(name, userId, vendorId, products) {
    const body = JSON.stringify({
      order_template: {
        user_id: userId,
        vendor_id: vendorId,
        name: name,
        products: products,
      },
    });
    return fetch(
      BASE_URL + `/users/${userId}/order_templates`,
      confObjAuthwithBody("POST", body)
    ).then(respFunc);
  }

  fetchOrderTemplate(userId, vendorId) {
    return fetch(
      vendorId === null
        ? `${BASE_URL}/users/${userId}/order_templates`
        : `${BASE_URL}/users/${userId}/order_templates?vendor_id=${vendorId}`,
      confObjAuth("GET")
    ).then(respFunc);
  }

  fetchAnOrderTemplate(templateId) {
    return fetch(
      BASE_URL + `/user/order_form?template_id=${templateId}`,
      confObjAuth("GET")
    ).then(respFunc);
  }

  fetchAddOrder(userId, vendorId, templateId) {
    return fetch(
      BASE_URL +
        `/user/order_form?template_id=${templateId}&user_id=${userId}&vendor_id=${vendorId}`,
      confObjAuth("GET")
    ).then(respFunc);
  }
}
export default new DataService();
