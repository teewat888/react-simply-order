import React, { useEffect } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getOrders } from "../../store/order-slice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";

export const MyOrder = (props) => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.order.orderList);
  const userId = useSelector((state) => state.auth.user.id);
  const navigate = useNavigate();
  const listLen = orderList.length;
  const arr = new Array(listLen);
  for (let i = 0; i < listLen; i++) {
    arr[i] = false;
  }
  const [open, setOpen] = React.useState(arr);

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
    console.log("current open -> ", open);
  }, [open]);

  useEffect(() => {
    dispatch(getOrders(userId));
  }, [orderList]);

  const handleEdit = (orderId) => {
    console.log("order edit id=>", orderId);
    navigate(`/user/order/${orderId}`);
  };
  const handleDelete = (orderId, i) => {
    handleClose(i);
    dispatch(deleteOrder(userId, orderId));
    setOpen((arr) => {
      arr.pop();
      return arr;
    });
  };
  return (
    <>
      <Box sx={{ width: "90%", bgcolor: "background.paper" }}>
        <List>
          <ListItemText>
            <Typography variant="h6">Orders</Typography>
          </ListItemText>
          {orderList.map((order, i) => (
            <ListItemButton key={order.id}>
              <ListItemText>{order.order_ref}</ListItemText>
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
      </Box>
    </>
  );
};
