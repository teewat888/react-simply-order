import { createSlice } from "@reduxjs/toolkit";
import DataService from "../lib/dataService";
import { errCatch } from "../lib/helper";
import { delay } from "../utils/delay";
import { uiActions } from "./ui-slice";
import { getAvendor } from "./vendor-slice";
import { handleDataErrMsg, handleDataSuccessMsg } from "../lib/handleDataMsg";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderList: [],
    isLoading: false,
    order: {
      order_date: "",
      delivery_date: "",
      order_ref: "",
      comment: "",
      user_id: null,
      vendor_id: null,
      order_details: [],
      success: null,
      id: null,
      item_ordered: [],
    },
    editMode: false,
    fetchSuccess: false,
  },
  reducers: {
    setOrderList(state, action) {
      state.orderList = [...action.payload];
      state.isLoading = false;
    },
    setOrder(state, action) {
  
      state.order = { ...action.payload };
      state.order.item_ordered = state.order.order_details.filter(
        (detail) => detail.qty !== "0" && detail.qty !== ""
      );
 
      state.isLoading = false;
    },
    removeOrder(state, action) {
      state.orderList = state.orderList.filter(
        (order) => order.id !== action.payload
      );
    },

    loading(state) {
      state.isLoading = true;
    },
    endLoading(state) {
      state.isLoading = false;
    },
    resetFetchFlag(state) {
      state.fetchSuccess = false;
    },
    finishFetch(state) {
      state.fetchSuccess = true;
    },
    setEditMode(state) {
      state.editMode = true;
    },
    resetEditMode(state) {
      state.editMode = false;
    },
    resetOrder(state) {
      state.order = {
        order_date: "",
        delivery_date: "",
        order_ref: "",
        comment: "",
        user_id: null,
        vendor_id: null,
        order_details: [],
        success: null,
        id: null,
        item_ordered: [],
      };
    },
    reset(state) {
      return { ...state.initialState };
    },
  },
});

export const updateOrder = (orderId, order, userId, vendorId) => {
  return (dispatch) => {
  
    DataService.fetchEditOrder(orderId, order, userId, vendorId)
      .then((data) => {
        if (data.success) {
       
          dispatch(orderActions.setOrder(data.order));
        } else {
          handleDataErrMsg(dispatch, data)();
        }
      })
      .catch(errCatch);
  };
};

// export const getData = () => {
//   return (dispatch) => {
//     DataService.fetchVendor()
//       .then((data) => {})
//       .catch(errCatch);
//   };
// };
//get lis of orders
export const getOrders = (user_id) => {
  return (dispatch) => {
    dispatch(orderActions.loading());
    DataService.fetchOrders(user_id)
      .then((data) => {
        if (data.success) {
          dispatch(orderActions.setOrderList(data.orders));
        } else {
          handleDataErrMsg(dispatch, data)();
        }
      })
      .catch(errCatch);
  };
};

export const deleteOrder = (user_id, order_id) => {
  return (dispatch) => {
    dispatch(orderActions.loading());
    DataService.fetchDeleteOrder(user_id, order_id)
      .then((data) => {
        if (data.success) {
          dispatch(orderActions.removeOrder(order_id));
          handleDataSuccessMsg(dispatch, data)();
          delay(1000).then(() => {
            dispatch(orderActions.finishFetch());
            dispatch(
              uiActions.showNotification({
                text: "",
                status: "error",
              })
            );
          });
          dispatch(orderActions.endLoading());
        } else {
          handleDataErrMsg(dispatch, data)();
        }
      })
      .catch(errCatch);
  };
};
// get order detail for edit/view
export const getOrder = (userId, orderId) => {
  return (dispatch) => {
    dispatch(orderActions.loading());
    DataService.fetchOrder(userId, orderId)
      .then((data) => {
        if (data.success) {
        
          dispatch(orderActions.setOrder(data.order));
          dispatch(orderActions.loading());
          delay(1500).then(() => {
            // dispatch(orderActions.finishFetch());
            dispatch(orderActions.setEditMode());
            dispatch(orderActions.endLoading());
          });
          // dispatch(orderActions.finishFetch());
        } else {
          handleDataErrMsg(dispatch, data)();
        }
      })
      .catch(errCatch);
  };
};

export const createOrder = (user_id, vendor_id, template_id) => {
  return (dispatch) => {
    dispatch(orderActions.loading());
    dispatch(getAvendor(vendor_id));
    DataService.fetchAddOrder(user_id, vendor_id, template_id)
      .then((data) => {
        if (data.success) {
         
          handleDataSuccessMsg(dispatch, data)();
          dispatch(orderActions.setOrder(data));
          dispatch(orderActions.finishFetch());
          // delay(1500).then(() => {
          //   dispatch(orderActions.finishFetch());
          // });
        } else {
          handleDataErrMsg(dispatch, data)();
        }
      })
      .catch(errCatch);
  };
};
export const sendEmail = (orderId) => {
  return (dispatch) => {
    
    DataService.fetchSendEmail(orderId)
      .then(() => {
        dispatch(
          uiActions.showNotification({
            text: "Email will be sent shortly, please check your inbox(if delivery is failure, the notice email will be sent to you).",
            status: "info",
          })
        );
        console.log("success send email");
      })
      .catch(errCatch);
  };
};

export const editEmailTo = (orderId, userId, emailTo) => {
  return (dispatch) => {
    DataService.fetchEditEmailTo(orderId, userId, emailTo)
      .then((data) => {
        if (data.success) {
        
          dispatch(orderActions.setOrder(data.order));
        } else {
          handleDataErrMsg(dispatch, data)();
        }
      })
      .catch(errCatch);
  };
};

export const orderActions = orderSlice.actions;

export default orderSlice;
