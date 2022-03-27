import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Container from "@mui/material/Container";
import { convertToPlainText } from "../../lib/convertText";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils/timeFormat";

export const Bag = ({ toggleDrawer, order }) => {
  const [items, setItems] = useState(order.order_details);
  const user = useSelector((state) => state.auth.user);
  order = { ...order, customer: user.company_name };

  return (
    <>
      <Box
        sx={{
          width: "18em",
          m: "1em",
          p: "0.5em",
          bgcolor: "#d6c9c5",
          height: "85%",
        }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        {order.order_ref}
        <br />
        Delivery date: {formatDate(order.delivery_date)}
        <br />
        Comment: {order.comment}
        <ul>
          {items.map((item) => {
            if (item.qty !== "0") {
              return (
                <li key={item.id}>
                  {item.name}&nbsp;&nbsp;{item.qty}
                  &nbsp;{item.unit}
                </li>
              );
            }
          })}
        </ul>
      </Box>
      <Box sx={{ m: "1em", p: "0.5em" }}>
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            navigator.clipboard.writeText(convertToPlainText(order));
            console.log("clipbard click", convertToPlainText(order));
          }}
        >
          Copy to clipboard
        </Button>
        <Button variant="outlined" size="small" sx={{ ml: "1em" }}>
          Email
        </Button>
      </Box>
    </>
  );
};
