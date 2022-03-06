import { Alert } from "@mui/material";
import React from "react";

export default function Notice({ message }) {
  return (
    <Alert variant="outlined" severity="warning">
      {message}
    </Alert>
  );
}
