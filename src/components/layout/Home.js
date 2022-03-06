import React from "react";
import { useSelector } from "react-redux";

export const Home = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log("home state auth ", isLoggedIn);
  return <div>Home</div>;
};
