import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProducts, productActions } from "../../store/product-slice";
import Checkbox from "@mui/material/Checkbox";
import { Button, TextField } from "@mui/material";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Box from "@mui/material/Box";
import { createTemplate, templateActions } from "../../store/template-slice";
import { SkeletonLoading } from "../layout/SkeletonLoading";
import { vendorActions } from "../../store/vendor-slice";

// This component take care of each product to be enable in each template

export const OrderTemplateForm = (props) => {
  const { user_id, vendor_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.productList);

  // flag to be set once order just create to redirect once finish created template
  const finishCreate = useSelector((state) => state.template.fetchSuccess);
  const isLoading = useSelector((state) => state.product.isLoading);
  const currentVendor = useSelector((state) => state.vendor.currentVendor);
  const company_name = currentVendor.company_name;

  console.log("we are at template now-finishcreate => ", finishCreate);
  const [currentProduct, setCurrentProduct] = useState(products);
  const [templateName, setTemplateName] = useState(company_name);
  console.log("current products->", currentProduct);
  const { template_id } = useParams(); // if template_id pass-> edit mode

  useEffect(() => {
    setCurrentProduct([...products]);
  }, [dispatch]);

  useEffect(() => {
    if (finishCreate) {
      navigate("/vendors");
      dispatch(templateActions.resetFetchFlag());
      dispatch(vendorActions.resetCurrentVendor());
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

  const handleEditTemplate = (e) => {};

  const handleCancelCreate = () => {
    dispatch(productActions.resetFetchFlag());
    dispatch(vendorActions.resetCurrentVendor());
    navigate("/vendors");
  };

  const handleCancelEdit = () => {
    navigate(`/user/${user_id}/order_templates/mytemplates`);
  };

  if (isLoading) {
    return <SkeletonLoading />;
  }

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
              {template_id ? "Edit template" : "Create Template"}
            </Button>
            <Button
              onClick={template_id ? handleCancelEdit : handleCancelCreate}
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
