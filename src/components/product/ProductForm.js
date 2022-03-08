import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DataService from "../../lib/dataService";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";

export const ProductForm = (props) => {
  const vendor_id = useSelector((state) => state.auth.user.id);
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    unit: "",
    vendor_id: null,
  });
  const formItems = [
    { label: "Product Name", id: "product_name", value: product.name },
    { label: "Brand", id: "product_brand", value: product.brand },
    { label: "Unit", id: "product_unit", value: product.unit },
  ];
  const handleOnChange = (e) => {
    setProduct({ ...product, [e.target.id]: e.target.value });
  };
  const handleSubmit = () => {};
  return (
    <Container sx={{ maxwidth: "95%", mt: "1em" }}>
      <Typography variant="h6">Create new product</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        {formItems.map((formItem) => (
          <TextField
            key={formItem.id}
            fullWidth
            label={formItem.label}
            id={formItem.id}
            value={formItem.value}
            size="small"
            margin="normal"
            onChange={handleOnChange}
          />
        ))}
        <input
          type="hidden"
          id="vendor_id"
          name="vendor_id"
          value={vendor_id}
        />
        <Button variant="outlined" sx={{ marginTop: "1em" }}>
          Add product
        </Button>
        <Button
          variant="outlined"
          sx={{ marginTop: "1em", marginLeft: "1em" }}
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </Button>
      </Box>
    </Container>
  );
};
