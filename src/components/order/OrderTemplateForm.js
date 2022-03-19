import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProducts } from "../../store/product-slice";
import Checkbox from "@mui/material/Checkbox";
import { Button, TextField } from "@mui/material";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Box from "@mui/material/Box";
import { createTemplate } from "../../store/template-slice";

// This component take care of each product to be enable in each template

export const OrderTemplateForm = (props) => {
  const { user_id, vendor_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.productList);
  const vendor = useSelector((state) => state.vendor.vendorList);
  // flag to be set once order just create to redirect once finish created template
  const finishCreate = useSelector((state) => state.template.createdSuccess);
  let company_name = "";
  //get company name
  if (vendor.length > 0) {
    const [vendor_detail] = vendor.filter((v) => v.id === parseInt(vendor_id));
    company_name = vendor_detail.company_name;
  }

  const [currentProduct, setCurrentProduct] = useState(products);
  const [templateName, setTemplateName] = useState(company_name);

  useEffect(() => {
    dispatch(getProducts(vendor_id, "template"));
    setCurrentProduct([...products]);
  }, [dispatch]);

  useEffect(() => {
    if (finishCreate) {
      navigate(-1);
    }
  }, [finishCreate]);

  const handleOnChange = (e) => {
    //handle check boxes
    setCurrentProduct(
      currentProduct.map((item) => {
        if (item.id === parseInt(e.target.id)) {
          return { ...item, in_template: e.target.checked };
        } else {
          return item;
        }
      })
    );
  };

  const handleNameChange = (e) => {
    setTemplateName(e.target.value);
  };

  const handleCreateTemplate = (e) => {
    dispatch(createTemplate(templateName, user_id, vendor_id, currentProduct));
  };

  return (
    <>
      <Box sx={{ width: "90%", bgcolor: "background.paper" }}>
        <List>
          <ListItemButton>
            <TextField
              fullWidth
              label="Template name: "
              size="small"
              margin="normal"
              id="templateName"
              value={templateName}
              onChange={handleNameChange}
            />
          </ListItemButton>
          <ListItemButton>
            <Button onClick={handleCreateTemplate} variant="outlined">
              Create Template
            </Button>
            <Button
              onClick={() => {
                navigate(-1);
              }}
              variant="outlined"
              sx={{ ml: "1em" }}
            >
              Cancel
            </Button>
          </ListItemButton>
          {currentProduct.map((product) => (
            <ListItemButton key={product.id}>
              <ListItemText>{product.name}</ListItemText>
              <Checkbox
                id={product.id.toString()}
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
