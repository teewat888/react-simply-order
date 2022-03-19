import React, { useEffect, useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/product-slice";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { getTemplates } from "../../store/template-slice";
import { createOrder } from "../../store/order-slice";
import { orderActions } from "../../store/order-slice";

//this component responsible for own template list and vender template list

export const OrderTemplate = (props) => {
  const navigate = useNavigate();
  const { vendor_id, mode } = useParams(); // get mode to distinct own template and company template
  console.log("mode->", mode);
  const dispatch = useDispatch();
  //const [templates, setTemplates] = useState([]);
  const templateList = useSelector((state) => state.template.templateList);

  const orderCreated = useSelector((state) => state.order.createdSuccess);
  console.log("orderCreated->", orderCreated);
  console.log("vendor_id in orderTemplate, ", vendor_id);
  const user_id = useSelector((state) => state.auth.user.id);
  const style = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 100,
    left: "auto",
    position: "fixed",
  };

  useEffect(() => {
    if (orderCreated) {
      navigate("/user/order/new");
      dispatch(orderActions.startCreate());
    }
  }, [orderCreated]);

  useEffect(() => {
    if (mode === "mytemplates") {
      dispatch(getTemplates(user_id, null));
    } else {
      dispatch(getProducts(vendor_id, "template"));
      dispatch(getTemplates(user_id, vendor_id));
    }
    return () => {};
  }, [mode]);

  const handleFabClick = () => {
    navigate(`/user/${user_id}/vendor/${vendor_id}/order_template/new`); // to <OrderTemplateForm />
  };

  const handleClick = (template_id, vendor_id) => {
    //handle to create new order
    dispatch(createOrder(user_id, vendor_id, template_id));
    //navigate(`/user/${user_id}/vendor/${vendor_id}/order/new/${template_id}`); //to <Order/>
  };
  return (
    <>
      <Box sx={{ width: "90%", bgcolor: "background.paper" }}>
        <List>
          <ListItemText>
            <Typography variant="h6">Order Template</Typography>
          </ListItemText>
          {templateList.map((template) => (
            <ListItemButton key={template.id}>
              <ListItemText>{template.name}</ListItemText>
              <Chip
                label="Create order"
                size="small"
                variant="outlined"
                color="primary"
                onClick={() => handleClick(template.id, template.vendor_id)}
              />
            </ListItemButton>
          ))}
        </List>
        {mode !== "mytemplates" ? (
          <Fab
            size="medium"
            color="primary"
            aria-label="add"
            style={style}
            onClick={handleFabClick}
          >
            <AddIcon />
          </Fab>
        ) : (
          ""
        )}
      </Box>
    </>
  );
};
