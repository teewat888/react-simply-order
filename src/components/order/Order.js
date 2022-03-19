import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAvendor } from "../../store/vendor-slice";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SearchBox } from "../form/SearchBox";
import { OrderForm } from "./OrderForm";

export const Order = (props) => {
  //const { user_id, vendor_id, template_id } = useParams();
  const dispatch = useDispatch();
  const currentVendor = useSelector((state) => state.vendor.currentVendor);

  const order = useSelector((state) => state.order.order);
  const orderDetailsOrg = order.order_details;
  const [orderDetails, setOrderDetails] = useState(orderDetailsOrg);
  const [expanded, setExpanded] = React.useState(false); //accordian state
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleQuantity = (e) => {
    //handle quantity input box
    setOrderDetails(
      orderDetails.map((item) => {
        if (item.id === parseInt(e.target.id)) {
          return { ...item, qty: e.target.value };
        } else {
          return item;
        }
      })
    );
  };

  useEffect(() => {
    // dispatch(getAvendor(vendor_id));
    // dataService
    //   .fetchAddOrder(user_id, vendor_id, template_id)
    //   .then((data) => {
    //     if (data.success) {
    //       dispatch(orderActions.setOrder(data));
    //     }
    //   })
    //   .catch(errCatch);
  }, []);

  const orderHeading = [
    {
      label: "Supplier",
      value: currentVendor.company_name,
    },
    {
      label: "Order Reference",
      value: order.order_ref,
    },
    {
      label: "Comments",
      value: order.comment,
    },
  ];
  return (
    <>
      <Box sx={{ width: "90%", bgcolor: "background.paper" }}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleExpand("panel1")}
          sx={{ mt: "1em" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            sx={{ mt: "1em" }}
          >
            <Typography sx={{ width: "100%", flexShrink: 0 }}>
              Order Information
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              label="Order date"
              sx={{ mt: "1em" }}
              InputLabelProps={{ shrink: true }}
              size="small"
              fullWidth
              type="date"
              value={order.order_date}
            />
            <TextField
              label="Delivery date"
              sx={{ mt: "1em" }}
              InputLabelProps={{ shrink: true }}
              size="small"
              fullWidth
              type="date"
              value={order.delivery_date}
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
          </AccordionDetails>
        </Accordion>

        <SearchBox handleSearch={handleSearch} searchTerm={searchTerm} />

        <List>
          <OrderForm
            handleQuantity={handleQuantity}
            orderDetails={orderDetails}
          />
        </List>
      </Box>
    </>
  );
};
