import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import dataService from "../../lib/dataService";
import { orderActions } from "../../store/order-slice";
import { uiActions } from "../../store/ui-slice";
import { getAvendor } from "../../store/vendor-slice";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

export const Order = (props) => {
  const { user_id, vendor_id, template_id } = useParams();
  const dispatch = useDispatch();

  const currentVendor = useSelector((state) => state.vendor.currentVendor);
  const orderDetails = useSelector((state) => state.order.orderDetails);
  console.log("order details: ", orderDetails);

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  useEffect(() => {
    dispatch(getAvendor(vendor_id));
    dataService
      .fetchAnOrderTemplate(template_id)
      .then((data) => {
        dispatch(orderActions.setOrder(data.products));
      })
      .catch((e) =>
        dispatch(
          uiActions.showNotification({
            text: e.message + "aaa",
            status: "error",
          })
        )
      );
  }, [dispatch]);
  const orderHeading = [
    {
      label: "Supplier",
      value: currentVendor.company_name,
    },
    {
      label: "Order Reference",
      value: currentVendor.company_name,
    },
    {
      label: "Comments",
      value: currentVendor.company_name,
    },
  ];
  return (
    <>
      <Box sx={{ width: "90%", bgcolor: "background.paper" }}>
        <TextField
          label="Order date"
          sx={{ mt: "1em" }}
          InputLabelProps={{ shrink: true }}
          size="small"
          fullWidth
          type="date"
        />
        <TextField
          label="Delivery date"
          sx={{ mt: "1em" }}
          InputLabelProps={{ shrink: true }}
          size="small"
          fullWidth
          type="date"
        />
        {orderHeading.map((h, i) => (
          <TextField
            key={i}
            label={h.label}
            sx={{ mt: "1em" }}
            value={h.value}
            InputLabelProps={{ shrink: true }}
            size="small"
            fullWidth
          />
        ))}
        <TextField
          id="search"
          label=""
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={handleSearch}
          variant="standard"
          value={searchTerm}
          sx={{ mt: "1em" }}
        />

        <List>
          {orderDetails.map((detail) => (
            <ListItem
              key={detail.id}
              disableGutters
              secondaryAction={
                <TextField
                  size="small"
                  margin="dense"
                  sx={{ width: "4em" }}
                  label={detail.unit}
                  InputLabelProps={{ shrink: true }}
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
        </List>
      </Box>
    </>
  );
};
