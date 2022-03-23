import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, productActions } from "../../store/product-slice";
import { getAvendor } from "../../store/vendor-slice";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

export const Vendor = ({ vendor }) => {
  const userId = useSelector((state) => state.auth.user.id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const readyToCreate = useSelector((state) => state.product.fetchSuccess);
  const currentVendor = useSelector((state) => state.vendor.currentVendor);

  const handleOnClick = (v) => {
    //to get product ready for template page (OrderTemplateForm
    dispatch(getProducts(v, "template"));
    dispatch(getAvendor(v));
  };

  // useEffect(() => {
  //   dispatch(productActions.resetFetchFlag());
  // }, []);

  useEffect(() => {
    if (readyToCreate) {
      if (currentVendor.id !== undefined) {
        //make sure we get vendor
        console.log("ready to create->", readyToCreate);
        console.log(
          "current vendor=->",
          currentVendor.id,
          `/user/${userId}/vendor/${currentVendor.id}/order_template/new`
        );

        navigate(
          `/user/${userId}/vendor/${currentVendor.id}/order_template/new`
        );
      }
    }
  }, [readyToCreate, currentVendor.id]);

  return (
    <ListItemButton>
      <ListItemText>{vendor.company_name}</ListItemText>
      <NoteAddIcon
        color={"primary"}
        onClick={() => {
          handleOnClick(vendor.id);
        }}
      />
    </ListItemButton>
  );
};
