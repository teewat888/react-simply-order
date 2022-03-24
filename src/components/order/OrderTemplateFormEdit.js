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
import {
  createTemplate,
  editTemplate,
  templateActions,
} from "../../store/template-slice";
import { SkeletonLoading } from "../layout/SkeletonLoading";
import { vendorActions } from "../../store/vendor-slice";
import { numbers } from "../../utils/numbers";

// This component take care of each product to be enable in each template

export const OrderTemplateFormEdit = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(
    (state) => state.template.templateDetails.products
  );

  // flag to be set once order just create to redirect once finish created template
  const finishEdit = useSelector((state) => state.template.editMode);
  const isLoading = useSelector((state) => state.template.isLoading);
  //const currentVendor = useSelector((state) => state.vendor.currentVendor);
  //   const company_name =
  //     currentVendor.company_name + numbers(1000, 9999).toString(); // gen random nam for template name

  const company_name = useSelector(
    (state) => state.template.templateDetails.name
  );

  console.log("we are at template now-finishcreate => ", finishEdit);
  const [currentProduct, setCurrentProduct] = useState(products);
  const [templateName, setTemplateName] = useState(company_name); // set default template name
  console.log("current products->", currentProduct);
  // if template_id pass-> edit mode
  const { user_id, template_id } = useParams();

  useEffect(() => {
    setCurrentProduct([...products]);
    setTemplateName(company_name);
  }, [products, company_name]);

  useEffect(() => {
    if (finishEdit) {
      navigate(`/user/${user_id}/order_templates/mytemplates`);
    }
  }, [finishEdit]);

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

  const handleEditTemplate = (e) => {
    console.log("edit click", currentProduct);
    dispatch(editTemplate(user_id, template_id, templateName, currentProduct));
  };

  const handleCancelCreate = () => {
    dispatch(productActions.resetFetchFlag());
    dispatch(vendorActions.resetCurrentVendor());
    navigate("/vendors");
  };

  const handleCancelEdit = () => {
    navigate(`/user/${user_id}/order_templates/mytemplates`);
  };

  if (currentProduct === undefined) {
    return null;
  }

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
            <Button onClick={handleEditTemplate} variant="outlined">
              Edit template
            </Button>
            <Button
              onClick={handleCancelEdit}
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
