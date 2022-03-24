import { BASE_URL } from "../config/contants";
import { confObjAuth, confObjAuthwithBody, respFunc } from "./helper";

class DataService {
  //display all products belongs to user , mode = myproduct for vendor product list, mode = template -> vailable product for template
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
  // vendor = null => to get all templates belong to the owner
  fetchOrderTemplate(userId, vendorId) {
    return fetch(
      vendorId === null
        ? `${BASE_URL}/users/${userId}/order_templates`
        : `${BASE_URL}/users/${userId}/order_templates?vendor_id=${vendorId}`,
      confObjAuth("GET")
    ).then(respFunc);
  }

  // fetchAnOrderTemplate(templateId) {
  //   return fetch(
  //     BASE_URL + `/user/order_form?template_id=${templateId}`,
  //     confObjAuth("GET")
  //   ).then(respFunc);
  // }

  // get a template detail to show in edit form
  fetchTemplate(userId, templateId) {
    return fetch(
      BASE_URL + `/users/${userId}/order_templates/${templateId}/edit`,
      confObjAuth("GET")
    ).then(respFunc);
  }

  fetchEditTemplate(userId, templateId, templateName, templateDetails) {
    const body = JSON.stringify({
      order_template: {
        id: templateId,
        name: templateName,
        products: templateDetails,
      },
    });
    console.log("body-> ", body);
    return fetch(
      BASE_URL + `/users/${userId}/order_templates/${templateId}`,
      confObjAuthwithBody("PATCH", body)
    ).then(respFunc);
  }

  fetchDeleteTemplate(userId, templateId) {
    return fetch(
      BASE_URL + `/users/${userId}/order_templates/${templateId}`,
      confObjAuth("DELETE")
    ).then(respFunc);
  }

  fetchAddOrder(userId, vendorId, templateId) {
    return fetch(
      BASE_URL +
        `/user/order_form?template_id=${templateId}&user_id=${userId}&vendor_id=${vendorId}`,
      confObjAuth("GET")
    ).then(respFunc);
  }
  //fetch id and order_ref for orders
  fetchOrders(userId) {
    return fetch(BASE_URL + `/users/${userId}/orders`, confObjAuth("GET")).then(
      respFunc
    );
  }
  fetchOrder(userId, orderId) {
    return fetch(
      BASE_URL + `/users/${userId}/orders/${orderId}/edit`,
      confObjAuth("GET")
    ).then(respFunc);
  }

  fetchEditOrder(orderId, order, userId, vendorId) {
    const body = JSON.stringify({
      order: {
        id: orderId,
        order_date: order.order_date,
        delivery_date: order.delivery_date,
        order_ref: order.order_ref,
        comment: order.comment,
        user_id: userId,
        vendor_id: vendorId,
        order_details: order.order_details,
      },
    });
    console.log("body-> ", body);
    return fetch(
      BASE_URL + `/users/${userId}/orders/${orderId}`,
      confObjAuthwithBody("PATCH", body)
    ).then(respFunc);
  }

  fetchDeleteOrder(userId, orderId) {
    return fetch(
      BASE_URL + `/users/${userId}/orders/${orderId}`,
      confObjAuth("DELETE")
    ).then(respFunc);
  }
}
export default new DataService();
