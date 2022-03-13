import React from "react";
import { useNavigate } from "react-router-dom";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

export const Vendor = ({ vendor }) => {
  const navigate = useNavigate();

  return (
    <ListItemButton>
      <ListItemText>{vendor.company_name}</ListItemText>
      <IconButton
        onClick={() => {
          navigate(`/order_templates/vendor/${vendor.id}`);
        }}
      >
        <AutoAwesomeMotionIcon />
      </IconButton>
    </ListItemButton>
  );
};
