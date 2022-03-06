import React from "react";
import { useSelector } from "react-redux";
import { Layout } from "./components/layout/Layout";
import { Home } from "./components/layout/Home";
import { NoMatch } from "./components/layout/NoMatch";
import { Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import VendorList from "./components/vendor/VendorList";
import Logout from "./components/auth/Logout";
import ProductList from "./components/product/ProductList";
import RequireVendor from "./components/auth/RequireVendor";
import ProductCRUD from "./components/product/ProductCRUD";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/auth/ProtectedRoute";

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

          <Route
            path="/profile"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
