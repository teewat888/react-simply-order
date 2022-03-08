import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/product-slice";
import { Product } from "./Product";

export default function MyProducts() {
  const products = useSelector((state) => state.product.productList);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.id);
  const role = useSelector((state) => state.auth.user.role);

  useEffect(() => {
    dispatch(getProducts(userId));
  }, [dispatch]);

  return (
    <>
      <Product products={products} />
    </>
  );
}
