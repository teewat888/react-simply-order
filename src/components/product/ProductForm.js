import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DataService from "../../lib/dataService";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import { uiActions } from "../../store/ui-slice";
import Checkbox from "@mui/material/Checkbox";
import { delay } from "../../utils/delay";

export const ProductForm = (props) => {
  const products = useSelector((state) => state.product.productList);
  const { product_id } = useParams(); // get params from navigated

  const vendor_id = useSelector((state) => state.auth.user.id);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    unit: "",
    available: true,
    vendor_id: vendor_id,
  });

  useEffect(() => {
    // is product_id passed, in edit mode
    if (product_id !== undefined) {
      const found = products.find((el) => el.id === parseInt(product_id));

      if (found) {
        const { name, brand, unit, available } = found;
        const vid = found.vendor.id;
        console.log(name, brand, unit, available, vid);
        setProduct({
          id: product_id,
          name: name,
          brand: brand,
          unit: unit,
          available: available,
          vendor_id: vid,
        });
      }
    }
  }, [product_id]);

  const formItems = [
    { label: "Product Name", id: "name", value: product.name },
    { label: "Brand", id: "brand", value: product.brand },
    { label: "Unit", id: "unit", value: product.unit },
  ];
  const handleOnChange = (e) => {
    setProduct({ ...product, [e.target.id]: e.target.value });
    console.log(product);
  };
  const handleCheckbox = (e) => {
    setProduct({ ...product, [e.target.id]: e.target.checked });
    console.log(product);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("press add");
    DataService.fetchAddProduct(product)
      .then((data) => {
        if (data.success) {
          console.log("product added: ", data);
          dispatch(
            uiActions.showNotification({
              text: `${data.product.name} has been added.`,
              status: "success",
            })
          );
          delay(1000).then(() => navigate(-1));
        } else {
          dispatch(
            uiActions.showNotification({
              text: data.message,
              status: "error",
            })
          );
        }
      })
      .catch((e) => {
        dispatch(
          uiActions.showNotification({
            text: e.message,
            status: "error",
          })
        );
      });
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    console.log("press update");
    DataService.fetchEditProduct(product)
      .then((data) => {
        if (data.success) {
          dispatch(
            uiActions.showNotification({
              text: `${data.product.name} has been updated.`,
              status: "success",
            })
          );
          delay(1000).then(() => navigate(-1));
        } else {
          dispatch(
            uiActions.showNotification({
              text: data.message,
              status: "error",
            })
          );
        }
      })
      .catch((e) => {
        dispatch(
          uiActions.showNotification({
            text: e.message,
            status: "error",
          })
        );
      });
  };

  return (
    <Container sx={{ maxwidth: "90%", mt: "1em" }}>
      <Typography variant="h6">
        {product_id ? "Edit product" : "Create new product"}
      </Typography>
      <Box
        sx={{ display: "flex" }}
        component="form"
        onSubmit={product_id ? handleSubmitEdit : handleSubmit}
      >
        <FormControl component="fieldset" sx={{ width: "100%" }}>
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
          <FormControlLabel
            control={
              <Checkbox
                id="available"
                checked={product.available}
                onChange={handleCheckbox}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="Available"
          />
          <input
            type="hidden"
            id="vendor_id"
            name="vendor_id"
            value={vendor_id}
          />
          <Stack spacing={2} direction="row" sx={{ marginTop: "1em" }}>
            <Button variant="outlined" type="submit">
              {product_id ? "Update" : "Create"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancel
            </Button>
          </Stack>
        </FormControl>
      </Box>
    </Container>
  );
};
