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
import { deleteTemplate, getTemplates } from "../../store/template-slice";
import { createOrder } from "../../store/order-slice";
import { orderActions } from "../../store/order-slice";
import { SkeletonLoading } from "../layout/SkeletonLoading";
import EditIcon from "@mui/icons-material/Edit";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

//this component responsible for own template list and vender template list

export const OrderTemplate = (props) => {
  const navigate = useNavigate();
  const { vendor_id, mode } = useParams(); // get mode to distinct own template and company template

  const dispatch = useDispatch();
  //const [templates, setTemplates] = useState([]);
  const templateList = useSelector((state) => state.template.templateList);
  const isLoading = useSelector((state) => state.order.isLoading);
  const orderCreated = useSelector((state) => state.order.fetchSuccess);
  const orderId = useSelector((state) => state.order.order.id);
  console.log("order create status ", orderCreated);
  const user_id = useSelector((state) => state.auth.user.id);
  const style = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 100,
    left: "auto",
    position: "fixed",
  };

  const listLen = templateList.length;
  console.log(" listlen and templateList ->", listLen, templateList);
  const arr = new Array(listLen);
  for (let i = 0; i < listLen; i++) {
    arr[i] = false;
  }
  // state for confirm dialogs
  const [open, setOpen] = useState(arr);

  useEffect(() => {
    dispatch(orderActions.resetFetchFlag());
  }, []);

  useEffect(() => {
    if (orderCreated) {
      console.log("orderId once order create->", orderId);
      if (orderId) {
        navigate(`/user/order/${orderId}`);
        dispatch(orderActions.resetFetchFlag()); // reset flag so can be use for next order
      }
    }
  }, [orderCreated, orderId]);

  useEffect(() => {
    if (mode === "mytemplates") {
      dispatch(getTemplates(user_id, null));
    } else {
      dispatch(getProducts(vendor_id, "template"));
      dispatch(getTemplates(user_id, vendor_id));
    }
    return () => {};
  }, [mode]);

  const handleClickOpen = (i) => {
    setOpen((arr) => {
      let temp = [...arr];
      temp[i] = true;
      return temp;
    });
  };

  const handleClose = (i) => {
    setOpen((arr) => {
      let temp = [...arr];
      temp[i] = false;
      return temp;
    });
  };

  const handleFabClick = () => {
    //navigate(`/user/${user_id}/vendor/${vendor_id}/order_template/new`); // to <OrderTemplateForm />
    navigate("/vendors");
  };

  const handleClick = (template_id, vendor_id) => {
    //handle to create new order
    dispatch(createOrder(user_id, vendor_id, template_id));
    // once complete create order flag createSuccess to useEffect to lauch <Order />
  };

  const handleEdit = (tid) => {
    navigate(`/user/template/${tid}/edit`);
  };

  const handleDelete = (tid) => {
    dispatch(deleteTemplate(user_id, tid));
  };

  if (isLoading) {
    return <SkeletonLoading />;
  }

  return (
    <>
      <Box sx={{ width: "90%", bgcolor: "background.paper" }}>
        <List>
          <ListItemText>
            <Typography variant="h6">Order Template</Typography>
          </ListItemText>
          {templateList.map((template, i) => (
            <ListItemButton key={template.id}>
              <ListItemText>{template.name}</ListItemText>
              <EditIcon
                color={"primary"}
                sx={{ mr: "0.5em" }}
                onClick={() => handleEdit(template.id)}
              />
              <DeleteIcon
                color={"primary"}
                sx={{ mr: "0.5em" }}
                onClick={() => handleClickOpen(i)}
              />
              <Dialog
                open={open[i]}
                onClose={() => handleClose(i)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Delete this template ?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    {template.name}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => handleClose(i)} autoFocus>
                    Cancel
                  </Button>
                  <Button onClick={() => handleDelete(template.id)}>Yes</Button>
                </DialogActions>
              </Dialog>
              <NoteAddIcon
                color={"primary"}
                onClick={() => handleClick(template.id, template.vendor_id)}
              />
            </ListItemButton>
          ))}
        </List>

        <Fab
          size="medium"
          color="primary"
          aria-label="add"
          style={style}
          onClick={handleFabClick}
        >
          <AddIcon />
        </Fab>
      </Box>
    </>
  );
};
