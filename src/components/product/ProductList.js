import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/product-slice";

export default function ProductList() {
  const products = useSelector((state) => state.product.productList);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.id);

  useEffect(() => {
    dispatch(getProducts(userId));
  }, [dispatch]);

  return (
    <>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </>
  );
}
