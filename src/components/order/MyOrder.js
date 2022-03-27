import React, { useDebugValue, useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrder,
  getOrder,
  getOrders,
  orderActions,
} from "../../store/order-slice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import { SkeletonLoading } from "../layout/SkeletonLoading";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export const MyOrder = (props) => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.order.orderList);
  const userId = useSelector((state) => state.auth.user.id);
  const navigate = useNavigate();
  const finishDelete = useSelector((state) => state.order.fetchSuccess);
  const [orderId, setOrderId] = useState(null);
  const isLoading = useSelector((state) => state.order.isLoading);
  const readyToEdit = useSelector((state) => state.order.editMode);
  //predefine open flags state
  const listLen = orderList.length;
  console.log(" listlen and orderList ->", listLen, orderList);
  const arr = new Array(listLen);
  for (let i = 0; i < listLen; i++) {
    arr[i] = false;
  }
  // state for confirm dialogs
  const [open, setOpen] = useState(arr);
  console.log("readytoedit->", finishDelete);
  const style = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 100,
    left: "auto",
    position: "fixed",
  }; //style for FAB

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
  useEffect(() => {
    if (readyToEdit) {
      dispatch(orderActions.resetEditMode());
      navigate(`/user/order/${orderId}`);
    }
  }, [readyToEdit]);

  //once finisnh delete redirect
  useEffect(() => {
    if (finishDelete) {
      navigate("/customer/orders");
    }
  }, [finishDelete]);
  // load my orders
  useEffect(() => {
    dispatch(getOrders(userId));
    console.log("order list", orderList);
  }, []);

  const handleEdit = (orderId) => {
    setOrderId(orderId);
    dispatch(getOrder(userId, orderId));
  };

  const handleDelete = (orderId, i) => {
    handleClose(i);
    dispatch(deleteOrder(userId, orderId));
    setOpen((arr) => {
      //to adjust dialog state
      arr.pop();
      return arr;
    });
  };

  const handleFabClick = () => {
    navigate(`/user/${userId}/order_templates/neworder`);
  };

  if (isLoading) {
    return <SkeletonLoading />;
  }

  return (
    <>
      <Box sx={{ width: "90%", bgcolor: "background.paper" }}>
        <List>
          <ListItemText>
            <Typography variant="h6">Orders</Typography>
          </ListItemText>

          {orderList.map((order, i) => (
            <ListItemButton key={order.id}>
              <ListItemText onClick={() => handleEdit(order.id)}>
                {order.order_ref}
              </ListItemText>
              <EditIcon
                color="primary"
                onClick={() => handleEdit(order.id)}
                sx={{ mr: "1em" }}
              />
              <DeleteIcon color="primary" onClick={() => handleClickOpen(i)} />
              <Dialog
                open={open[i]}
                onClose={() => handleClose(i)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Delete this order ?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    {order.order_ref}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => handleClose(i)} autoFocus>
                    Cancel
                  </Button>
                  <Button onClick={() => handleDelete(order.id, i)}>Yes</Button>
                </DialogActions>
              </Dialog>
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
