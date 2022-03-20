import React from "react";
import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const OrderHead = ({
  handleExpand,
  handleChange,
  heading,
  currentVendor,
  expanded,
}) => {
  const orderHeading = [
    {
      id: "order_ref",
      label: "Order Reference",
      value: heading.order_ref,
    },
    {
      id: "comment",
      label: "Comments",
      value: heading.comment,
    },
  ];
  return (
    <>
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
            value={heading.order_date}
            onChange={handleChange}
            id="order_date"
          />
          <TextField
            label="Delivery date"
            sx={{ mt: "1em" }}
            InputLabelProps={{ shrink: true }}
            size="small"
            fullWidth
            type="date"
            value={heading.delivery_date}
            onChange={handleChange}
            id="delivery_date"
          />
          <TextField
            label="Supplier"
            sx={{ mt: "1em" }}
            InputLabelProps={{ shrink: true }}
            size="small"
            fullWidth
            disabled
            value={currentVendor.company_name}
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
              onChange={handleChange}
              id={h.id}
            />
          ))}
        </AccordionDetails>
      </Accordion>
    </>
  );
};
