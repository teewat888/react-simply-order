import React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import TopNav from "./components/navigations/TopNav";
import BottomNav from "./components/navigations/BottomNav";
import Login from "./components/auth/Login";

function App() {
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
        <Login />
        <BottomNav />
      </Box>
    </>
  );
}

export default App;
