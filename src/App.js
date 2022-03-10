import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Layout } from "./components/layout/Layout";
import { Home } from "./components/layout/Home";
import { NoMatch } from "./components/layout/NoMatch";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/auth/Login";
import VendorList from "./components/vendor/VendorList";
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
import { doLogout } from "./store/auth-slice";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { uiActions } from "./store/ui-slice";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userRole = useSelector((state) => state.auth.user.role);
  const user_id = useSelector((state) => state.auth.user.id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //dispatch(authActions.logout_success());
  console.log(userRole);
  console.log("user id: ", user_id);
  console.log("init isloggin state", isLoggedIn);
  const handleUnAuth = () => {
    dispatch(authActions.logout()); // as jwt expire reset state at client
  };

  useEffect(() => {
    authVerify(handleUnAuth);
    dispatch(uiActions.clear());
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />

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
            <Route
              path="/vendor/products/edit/:product_id"
              element={
                <ProtectedRoute isAllow={isLoggedIn}>
                  <ProductForm />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
