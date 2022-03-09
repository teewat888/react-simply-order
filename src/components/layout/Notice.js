import { Alert } from "@mui/material";
import React from "react";

export default function Notice({ message }) {
  return (
    <Alert
      variant="outlined"
      severity={message.status}
      maxwidth="xs"
      sx={{ mt: "1em" }}
    >
      {message.text}
    </Alert>
  );
}
