import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { convertToPlainText } from "../../lib/convertText";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../utils/timeFormat";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import { sendEmail } from "../../store/order-slice";

export const Bag = ({ toggleDrawer, order }) => {
  const [items, setItems] = useState(order.order_details);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [emailTo, setEmailTo] = useState(order.email_to);
  order = { ...order, customer: user.company_name };

  const handleEmailTo = (e) => {
    setEmailTo(e.target.value);
  };

  const handleClickEmail = (e) => {
    dispatch(sendEmail(order.id));
  };

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
                <>
                  <li key={item.id}>
                    {item.name}&nbsp;&nbsp;{item.qty}
                    &nbsp;{item.unit}
                  </li>
                </>
              );
            }
          })}
        </ul>
      </Box>
      <Box sx={{ m: "1em", p: "0.5em" }}>
        <Button
          variant="outlined"
          size="small"
          sx={{ mt: "-3em" }}
          onClick={() => {
            navigator.clipboard.writeText(convertToPlainText(order));
            console.log("clipbard click", convertToPlainText(order));
          }}
        >
          Copy to clipboard
        </Button>
        <br />
        <Button
          variant="outlined"
          size="small"
          sx={{ mt: "0em" }}
          onClick={handleClickEmail}
        >
          Email
        </Button>

        <TextField
          size="small"
          id="email_to"
          label="Recipient's email"
          sx={{ mt: "0em" }}
          InputLabelProps={{ shrink: true }}
          value={emailTo}
          onChange={handleEmailTo}
        />
      </Box>
    </>
  );
};
