import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/product-slice";
import { Product } from "./Product";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

export default function MyProducts() {
  const products = useSelector((state) => state.product.productList);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.id);
  const role = useSelector((state) => state.auth.user.role);
  const navigate = useNavigate();
  const style = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 100,
    left: "auto",
    position: "fixed",
  };

  useEffect(() => {
    dispatch(getProducts(userId));
  }, [dispatch]);

  const handleFabClick = () => {
    navigate("/vendor/products/new");
  };

  return (
    <>
      <Product products={products} />
      <Fab
        size="small"
        color="primary"
        aria-label="add"
        style={style}
        onClick={handleFabClick}
      >
        <AddIcon />
      </Fab>
    </>
  );
}
