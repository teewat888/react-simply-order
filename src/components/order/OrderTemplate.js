import React, { useEffect, useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/product-slice";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import dataService from "../../lib/dataService";
import { uiActions } from "../../store/ui-slice";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { Typography } from "@mui/material";
import { errCatch } from "../../lib/helper";

export const OrderTemplate = (props) => {
  const navigate = useNavigate();
  const { vendor_id, mode } = useParams(); // get mode to distinct own template and company template
  const dispatch = useDispatch();
  const [templates, setTemplates] = useState([]);

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
    if (mode === "mytemplates") {
      dataService
        .fetchOrderTemplate(user_id, null)
        .then((data) => {
          setTemplates(data.templates);
        })
        .catch(errCatch);
    } else {
      dispatch(getProducts(vendor_id, "template"));
      dataService
        .fetchOrderTemplate(user_id, vendor_id)
        .then((data) => {
          setTemplates(data.templates);
        })
        .catch(errCatch);
    }
    return () => {};
  }, [mode]);

  const handleFabClick = () => {
    navigate(`/user/${user_id}/vendor/${vendor_id}/order_template/new`); // to <OrderTemplateForm />
  };

  const handleClick = (template_id, vendor_id) => {
    navigate(`/user/${user_id}/vendor/${vendor_id}/order/new/${template_id}`); //to <Order/>
  };
  return (
    <>
      <Box sx={{ width: "90%", bgcolor: "background.paper" }}>
        <List>
          <ListItemText>
            <Typography variant="h6">Order Template</Typography>
          </ListItemText>
          {templates.map((template) => (
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
