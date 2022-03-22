import Alert from "@mui/material/Alert";
import React from "react";

export const NoMatch = () => {
  return (
    <>
      <Alert severity="warning" sx={{ mt: "2em" }}>
        Sorry, can not find the requested page (404)
      </Alert>
    </>
  );
};
