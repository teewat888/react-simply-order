import { Alert } from "@mui/material";
import React from "react";
import { renderHTML } from "../../lib/helper";

export default function Notice({ message }) {
  return (
    <Alert
      variant="outlined"
      severity={message.status}
      maxwidth="xs"
      sx={{ mt: "1em" }}
    >
      {renderHTML(message.text)}
    </Alert>
  );
}
