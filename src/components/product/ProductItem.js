import React from "react";

import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

import { useNavigate } from "react-router-dom";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";

export const ProductItem = ({ product }) => {
  const navigate = useNavigate();
  return (
    <ListItemButton>
      <ListItemText>{product.name}</ListItemText>
      <IconButton
        aria-label="edit"
        color="primary"
        onClick={() => {
          navigate(`/vendor/products/edit/${product.id}`);
        }}
      >
        <EditIcon />
      </IconButton>
    </ListItemButton>
  );
};
