import { BASE_URL } from "./contants";

export const fetchProducts = () => {
  console.log(BASE_URL);
  return fetch(BASE_URL + "/products?limit=30");
};
