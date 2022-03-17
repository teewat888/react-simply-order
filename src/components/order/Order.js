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
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const Order = (props) => {
  const { user_id, vendor_id, template_id } = useParams();
  const dispatch = useDispatch();

  const currentVendor = useSelector((state) => state.vendor.currentVendor);
  const orderDetails = useSelector((state) => state.order.orderDetails);
  console.log("order details: ", orderDetails);
  const [expanded, setExpanded] = React.useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
          </AccordionDetails>
        </Accordion>

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
