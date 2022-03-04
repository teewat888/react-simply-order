import React from "react";
import { useSelector } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import TopNav from "./components/navigations/TopNav";
import BottomNav from "./components/navigations/BottomNav";
import Login from "./components/auth/Login";
import VendorList from "./components/protects/VendorList";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CssBaseline />
        <TopNav />
        {!isLoggedIn && <Login />}
        {isLoggedIn && <VendorList />}
        <BottomNav />
      </Box>
    </>
  );
}

export default App;
