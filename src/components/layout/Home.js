import Typography from "@mui/material/Typography";
import React from "react";
import { useSelector } from "react-redux";
import Login from "../auth/Login";
import Box from "@mui/material/Box";

export const Home = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      <Box sx={{ width: "85%", mt: "1em" }}>
        <Typography variant="h2">Get order done quick!</Typography>
      </Box>
      {!isLoggedIn && <Login />}
    </>
  );
};
