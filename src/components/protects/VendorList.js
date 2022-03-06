import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const VendorList = () => {
  //   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  //   console.log("vendors ", isLoggedIn);
  //   const navigate = useNavigate();
  //   useEffect(() => {
  //     if (!isLoggedIn) {
  //       navigate("/login");
  //     }
  //   }, [isLoggedIn]);
  return (
    <>
      <div>YOu are in protect area</div>
    </>
  );
};

export default VendorList;
