import React from "react";
import { useSelector } from "react-redux";
import { Login } from "../auth/Login";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { HomeCustomer } from "./HomeCustomer";
import { HomeVendor } from "./HomeVendor";

export const Home = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      <Box sx={{ width: "85%", mt: "1em" }}>
        <Typography variant="h3" align="center">
          Get orders done quickly!
        </Typography>
        {!isLoggedIn && <Login />}
        {isLoggedIn && user.role.id === 2 && <HomeVendor />}
        {isLoggedIn && user.role.id === 3 && <HomeCustomer user={user} />}
      </Box>
    </>
  );
};
