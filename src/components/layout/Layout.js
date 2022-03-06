import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import TopNav from "../navigations/TopNav";
import BottomNav from "../navigations/BottomNav";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Notice from "./Notice";

export const Layout = () => {
  const message = useSelector((state) => state.ui.message);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CssBaseline />
      <TopNav />
      <Outlet />
      {message && <Notice message={message} />}
      <BottomNav />
    </Box>
  );
};
