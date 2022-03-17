import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";

export const OrderForm = ({ orderDetails, handleQuantity }) => {
  return (
    <>
      {orderDetails.map((detail) => (
        <ListItem
          key={detail.id}
          disableGutters
          secondaryAction={
            <TextField
              id={detail.id.toString()}
              size="small"
              margin="dense"
              sx={{ width: "4em" }}
              label={detail.unit}
              InputLabelProps={{ shrink: true }}
              onChange={handleQuantity}
              value={detail.qty}
            />
          }
        >
          <ListItemButton>
            <ListItemText>
              {detail.name}[{detail.brand}]
            </ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </>
  );
};
