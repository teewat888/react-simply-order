import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export const HomeVendor = () => {
  const navigate = useNavigate();
  return (
    <>
      <Typography
        variant="h6"
        align="left"
        color="primary"
        sx={{ mt: "2em", ml: "1em" }}
      >
        Quick links
        <br />
        <br />
        <Button
          variant={"outlined"}
          onClick={() => navigate(`/vendor/products/new`)}
        >
          Create a Product
        </Button>
        <br />
        <br />
        Or Choose from the top right menu
      </Typography>
    </>
  );
};
