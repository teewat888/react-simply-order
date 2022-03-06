import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import TopNav from "../navigations/TopNav";
import BottomNav from "../navigations/BottomNav";
import { Outlet } from "react-router-dom";

export const Layout = () => {
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
      <BottomNav />
    </Box>
  );
};
