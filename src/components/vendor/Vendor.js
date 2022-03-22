import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/product-slice";

export const Vendor = ({ vendor }) => {
  const userId = useSelector((state) => state.auth.user.id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(getProducts(vendor.id, "template"));
    navigate(`/user/${userId}/vendor/${vendor.id}/order_template/new`);
  };
  useEffect(() => {}, []);
  return (
    <ListItemButton>
      <ListItemText>{vendor.company_name}</ListItemText>
      <Chip
        label="Create template"
        size="small"
        variant="outlined"
        color="primary"
        onClick={handleOnClick}
      />
    </ListItemButton>
  );
};
