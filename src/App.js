import React from "react";
import { RequireAuth } from "./components/auth/RequireAuth";
import { useSelector } from "react-redux";
import { Layout } from "./components/layout/Layout";
import { Home } from "./components/layout/Home";
import { NoMatch } from "./components/layout/NoMatch";
import { Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import VendorList from "./components/protects/VendorList";
import { useLocalStorage } from "./utils/useLocalStorage";
import Logout from "./components/auth/Logout";
import TestProtect from "./components/protects/TestProtect";
import ProductList from "./components/product/ProductList";
import RequireVendor from "./components/auth/RequireVendor";
import ProductCRUD from "./components/protects/ProductCRUD";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log("init isloggin state", isLoggedIn);
  // const [isAuth, setIsAuth] = useLocalStorage("loggedin", false);
  // setIsAuth(isLoggedIn);
  // console.log("reauth ", isLoggedIn);
  // console.log("local sotrage ", isAuth);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/products" element={<ProductList />} />

          {/* <Route path="/vendors" element={<VendorList />} /> */}
          <Route
            path="/vendors"
            element={
              <RequireAuth isLoggedIn={isLoggedIn}>
                <VendorList />
              </RequireAuth>
            }
          />
          <Route
            path="/product-admin"
            element={
              <RequireVendor>
                <ProductCRUD />
              </RequireVendor>
            }
          />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
