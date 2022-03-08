import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Layout } from "./components/layout/Layout";
import { Home } from "./components/layout/Home";
import { NoMatch } from "./components/layout/NoMatch";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/auth/Login";
import VendorList from "./components/vendor/VendorList";
import Logout from "./components/auth/Logout";
import ProductList from "./components/product/ProductList";
import RequireVendor from "./components/auth/RequireVendor";
import MyProducts from "./components/product/MyProducts";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DataService from "./lib/dataService";
import { useDispatch } from "react-redux";
import { authActions } from "./store/auth-slice";
import { authVerify } from "./lib/authVerify";
import { ProductForm } from "./components/product/ProductForm";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userRole = useSelector((state) => state.auth.user.role);
  const user_id = useSelector((state) => state.auth.user.id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(userRole);
  console.log("user id: ", user_id);
  console.log("init isloggin state", isLoggedIn);
  const handleUnAuth = () => {
    dispatch(authActions.logout());
  };
  // const [isAuth, setIsAuth] = useLocalStorage("loggedin", false);
  // setIsAuth(isLoggedIn);
  // console.log("reauth ", isLoggedIn);
  // console.log("local sotrage ", isAuth);
  useEffect(() => {
    console.log("auth verfied ", isLoggedIn);
    authVerify(handleUnAuth);
  });
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
              <ProtectedRoute isAllow={isLoggedIn}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vendor/products"
            element={
              <ProtectedRoute isAllow={isLoggedIn}>
                <MyProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vendor/products/new"
            element={
              <ProtectedRoute isAllow={isLoggedIn}>
                <ProductForm />
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
