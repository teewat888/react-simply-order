import React, { useEffect } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../store/order-slice";

export const MyOrder = (props) => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.order.orderList);
  const userId = useSelector((state) => state.auth.user.id);
  useEffect(() => {
    dispatch(getOrders(userId));
  }, []);

  return (
    <>
      <Box sx={{ width: "90%", bgcolor: "background.paper" }}>
        <List>
          <ListItemText>
            <Typography variant="h6">Orders</Typography>
          </ListItemText>
          {orderList.map((order) => (
            <ListItemButton key={order.id}>
              <ListItemText>{order.id}</ListItemText>
            </ListItemButton>
          ))}
        </List>
      </Box>
    </>
  );
};
