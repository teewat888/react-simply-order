import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import LeftNav from "../navigations/LeftNav";
import BottomNav from "../navigations/BottomNav";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Notice from "./Notice";

export const Layout = () => {
  const message = useSelector((state) => state.ui.message);
  console.log("message: ", message);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CssBaseline />
      <LeftNav />
      {message.text && <Notice message={message} />}
      <Outlet />

      <BottomNav />
    </Box>
  );
};
