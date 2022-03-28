import Typography from "@mui/material/Typography";
import React from "react";
import { useSelector } from "react-redux";
import { Login } from "../auth/Login";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <Box sx={{ width: "85%", mt: "1em" }}>
        <Typography variant="h3" align="center">
          Get orders done quickly!
        </Typography>
        {!isLoggedIn && <Login />}
        {isLoggedIn && (
          <Typography
            variant="h6"
            align="left"
            color="primary"
            sx={{ mt: "2em", ml: "1em" }}
          >
            Quick links
            <br />
            <br />
            <Button variant={"outlined"} onClick={() => navigate(`/vendors`)}>
              Create a new order template
            </Button>
            <br />
            <br />
            <Button
              variant={"outlined"}
              onClick={() =>
                navigate(`/user/${user.id}/order_templates/neworder`)
              }
            >
              Create a new order
            </Button>
            <br />
            <br />
            Or Choose from the top right menu
          </Typography>
        )}
      </Box>
    </>
  );
};
