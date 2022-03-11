import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth-slice";
import productSlice from "./product-slice";
import uiSlice from "./ui-slice";
import vendorSlice from "./vendor-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    product: productSlice.reducer,
    ui: uiSlice.reducer,
    vendor: vendorSlice.reducer,
  },
});

export default store;
