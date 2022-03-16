import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Layout } from "./components/layout/Layout";
import { Home } from "./components/layout/Home";
import { NoMatch } from "./components/layout/NoMatch";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/auth/Login";
import VendorList from "./components/vendor/VendorList";
import MyProducts from "./components/product/MyProducts";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { useDispatch } from "react-redux";
import { authActions } from "./store/auth-slice";
import { authVerify } from "./lib/authVerify";
import { ProductForm } from "./components/product/ProductForm";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { uiActions } from "./store/ui-slice";
import { OrderTemplate } from "./components/order/OrderTemplate";
import { OrderTemplateForm } from "./components/order/OrderTemplateForm";
import { Order } from "./components/order/Order";
import SignUp from "./components/auth/SignUp";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userRole = useSelector((state) => state.auth.user.role.name);
  const user_id = useSelector((state) => state.auth.user.id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUnAuth = () => {
    dispatch(authActions.logout()); // as jwt expire reset state at client
  };

  useEffect(() => {
    authVerify(handleUnAuth); // expire jwt?
    dispatch(uiActions.clear()); // clear notification each page
  });

  const myProtectedRoutes = [
    {
      path: "/vendor/products",
      element: (
        <ProtectedRoute isAllow={isLoggedIn}>
          <MyProducts />
        </ProtectedRoute>
      ),
    },
    {
      path: "/vendor/products/new",
      element: (
        <ProtectedRoute isAllow={isLoggedIn}>
          <ProductForm />
        </ProtectedRoute>
      ),
    },
    {
      path: "/profile",
      element: (
        <ProtectedRoute isAllow={isLoggedIn}>
          <Profile />
        </ProtectedRoute>
      ),
    },
    {
      path: "/vendor/products/edit/:product_id",
      element: (
        <ProtectedRoute isAllow={isLoggedIn}>
          <ProductForm />
        </ProtectedRoute>
      ),
    },
    {
      path: "/order_templates/vendor/:vendor_id",
      element: (
        <ProtectedRoute isAllow={isLoggedIn}>
          <OrderTemplate />
        </ProtectedRoute>
      ),
    },
    {
      //  /user/#user_id/order_templates?mode=mytemplates
      path: "/user/:user_id/order_templates/:mode",
      element: (
        <ProtectedRoute isAllow={isLoggedIn}>
          <OrderTemplate />
        </ProtectedRoute>
      ),
    },
    {
      path: "/user/:user_id/vendor/:vendor_id/order_template/new",
      element: (
        <ProtectedRoute isAllow={isLoggedIn}>
          <OrderTemplateForm />
        </ProtectedRoute>
      ),
    },
    {
      path: "/user/:user_id/vendor/:vendor_id/order/new/:template_id",
      element: (
        <ProtectedRoute isAllow={isLoggedIn}>
          <Order />
        </ProtectedRoute>
      ),
    },
  ];

  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/vendors" element={<VendorList />} />

            {myProtectedRoutes.map((myProtectedRoute, index) => (
              <Route
                key={index}
                path={myProtectedRoute.path}
                element={myProtectedRoute.element}
              />
            ))}

            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
