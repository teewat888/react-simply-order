import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProducts } from "../../store/product-slice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import { Button, TextField } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import Box from "@mui/material/Box";

export const OrderTemplateForm = (props) => {
  const { user_id, vendor_id } = useParams();

  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.productList);
  const username = useSelector((state) => state.auth.user.name);
  const [currentProduct, setCurrentProduct] = useState(products);
  const [templateName, setTemplateName] = useState(username);

  useEffect(() => {
    dispatch(getProducts(vendor_id, "template"));
    setCurrentProduct([...products]);
    console.log("current prod ", currentProduct);
  }, [dispatch]);
  //console.log("products ", products);

  const handleOnChange = (e) => {
    console.log("id of obj ", e.target.id);
    console.log("value need to change ", e.target.checked);
    setCurrentProduct(
      currentProduct.map((item) => {
        if (item.id === parseInt(e.target.id)) {
          console.log("item id ", item.id);
          console.log("id pass from ", e.target.id);
          return { ...item, in_template: e.target.checked };
        } else {
          return item;
        }
      })
    );
    console.log("product after on change ", currentProduct);
  };

  return (
    <>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <List>
          <ListItemButton>
            <TextField
              fullWidth
              label="Template name: "
              size="small"
              margin="normal"
              id="templateName"
              value={templateName}
            />
          </ListItemButton>
          {currentProduct.map((product) => (
            <ListItemButton>
              <ListItemText>{product.name}</ListItemText>
              <Checkbox
                id={product.id}
                checked={product.in_template}
                onChange={handleOnChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </>
  );
};
