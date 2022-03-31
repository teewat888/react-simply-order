import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Layout } from "./components/layout/Layout";
import { Home } from "./components/page/Home";
import { NoMatch } from "./components/layout/NoMatch";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { VendorList } from "./components/vendor/VendorList";
import { MyProducts } from "./components/product/MyProducts";
import { Profile } from "./components/user/Profile";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { useDispatch } from "react-redux";
import { authActions } from "./store/auth-slice";
import { authVerify } from "./lib/authVerify";
import { ProductForm } from "./components/product/ProductForm";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import { uiActions } from "./store/ui-slice";
import { OrderTemplate } from "./components/order/OrderTemplate";
import { OrderTemplateForm } from "./components/order/OrderTemplateNew";
import { Order } from "./components/order/Order";
import { SignUp } from "./components/auth/SignUp";
import { MyOrder } from "./components/order/MyOrder";
import { OrderTemplateFormEdit } from "./components/order/OrderTemplateEdit";
import { OrderTemplateFormNew } from "./components/order/OrderTemplateNew";
import { About } from "./components/page/About";
import { Help } from "./components/page/Help";
import { ChangePassword } from "./components/auth/ChangePassword";
import { ForgotPassword } from "./components/auth/ForgotPassword";
import { ResetPassword } from "./components/auth/ResetPassword";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const jwt = localStorage.getItem("jwt");
  const userRole = useSelector((state) => state.auth.user.role.name);
  const user_id = useSelector((state) => state.auth.user.id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("logged in status ", isLoggedIn);

  const handleUnAuth = () => {
    dispatch(authActions.logout_success()); // as jwt expire reset state at client
    console.log("jwt expire");
  };
  //dispatch(authActions.logout_success());
  //dispatch(orderActions.resetOrder());
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
      //  /user/#user_id/order_templates/mytemplates  -> useParams will get const mode
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
          <OrderTemplateFormNew />
        </ProtectedRoute>
      ),
    },
    {
      path: "/user/:user_id/template/:template_id/edit",
      element: (
        <ProtectedRoute isAllow={isLoggedIn}>
          <OrderTemplateFormEdit />
        </ProtectedRoute>
      ),
    },
    {
      path: "/user/order/new",
      element: (
        <ProtectedRoute isAllow={isLoggedIn}>
          <Order />
        </ProtectedRoute>
      ),
    },
    {
      //  /user/order/##  ##= order_id
      path: "/user/order/:order_id",
      element: (
        <ProtectedRoute isAllow={isLoggedIn}>
          <Order />
        </ProtectedRoute>
      ),
    },
    {
      path: "/customer/orders",
      element: (
        <ProtectedRoute isAllow={isLoggedIn}>
          <MyOrder />
        </ProtectedRoute>
      ),
    },
    {
      path: "/change_password",
      element: (
        <ProtectedRoute isAllow={isLoggedIn}>
          <ChangePassword />
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
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp role={3} />} />
            <Route path="/signup_vendor" element={<SignUp role={2} />} />
            <Route path="/vendors" element={<VendorList />} />
            <Route path="/forgot_password" element={<ForgotPassword />} />
            <Route path="/reset_password/:token" element={<ResetPassword />} />

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
