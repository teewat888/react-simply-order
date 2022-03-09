import React from "react";
import { useSelector } from "react-redux";
import Login from "../auth/Login";

export const Home = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return <>{!isLoggedIn && <Login />}</>;
};
