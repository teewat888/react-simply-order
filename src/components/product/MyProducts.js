import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/product-slice";
import { Product } from "./Product";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export default function MyProducts() {
  const products = useSelector((state) => state.product.productList);
  const isLoading = useSelector((state) => state.product.isLoading);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.id);
  const role = useSelector((state) => state.auth.user.role.name);
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
    dispatch(getProducts(userId, "myproduct"));
  }, [dispatch]);

  const handleFabClick = () => {
    navigate("/vendor/products/new");
  };

  //create multiple skeltons
  const skeletons = [];
  for (let i = 1; i < 25; i++) {
    skeletons.push(<Skeleton key={i} />);
  }

  return (
    <>
      {isLoading ? (
        <>
          <Box sx={{ width: "80%", height: "100%", mt: "2em" }}>
            {skeletons}
          </Box>
        </>
      ) : (
        <>
          <Product products={products} />
          <Fab
            size="medium"
            color="primary"
            aria-label="add"
            style={style}
            onClick={handleFabClick}
          >
            <AddIcon />
          </Fab>
        </>
      )}
    </>
  );
}
