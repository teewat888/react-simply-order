import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Home from "@mui/icons-material/Home";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import HistoryIcon from "@mui/icons-material/History";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Drawer from "@mui/material/Drawer";
import { Bag } from "../order/Bag";
import Badge from "@mui/material/Badge";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { getProducts } from "../../store/product-slice";

export default function SimpleBottomNavigation() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user.id);
  const user = useSelector((state) => state.auth.user);
  const order = useSelector((state) => state.order.order);
  const [state, setState] = useState(false);
  const products = useSelector((state) => state.product.productList);
  const dispatch = useDispatch();
  const [productCount, setProductCount] = useState(0);


  const toggleDrawer = (open) => (event) => {
    setState(open);
  };

  useEffect(() => {
    if (user.role.id === 2) {
      if (products !== undefined) {
        setProductCount(products.length);
      } else {
        dispatch(getProducts(userId, "myproduct"));
      }
    }
  }, [products, user.role.id]);

  if (user.role.id === 3) {
    return (
      <Box sx={{ width: "100%", paddingTop: "60px" }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            
          }}
          sx={{
            width: "100%",
            position: "fixed",
            bottom: 0,
            alignItems: "center",
          }}
        >
          <BottomNavigationAction
            label="Home"
            icon={<Home />}
            onClick={() => {
              navigate("/");
            }}
          />
          <BottomNavigationAction
            label="Templates"
            icon={<AutoAwesomeMotionIcon />}
            onClick={() => {
              navigate(`/user/${userId}/order_templates/mytemplates`);
            }}
          />
          <BottomNavigationAction
            label="Past Orders"
            icon={<HistoryIcon />}
            onClick={() => {
              navigate("/customer/orders");
            }}
          />

          <BottomNavigationAction
            label="Bag"
            icon={
              <Badge badgeContent={order.item_ordered.length} color="primary">
                <LocalMallIcon />
              </Badge>
            }
            onClick={toggleDrawer(true)}
          />
          <Drawer
            anchor="right"
            open={state}
            onClose={toggleDrawer(false)}
            PaperProps={{ style: { backgroundColor: "#ede4e1" } }}
          >
            <Bag toggleDrawer={toggleDrawer} order={order} />
          </Drawer>
        </BottomNavigation>
      </Box>
    );
  } else if (user.role.id === 2) {
    //vendor menu

    return (
      <Box sx={{ width: "100%", paddingTop: "60px" }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          
          }}
          sx={{
            width: "100%",
            position: "fixed",
            bottom: 0,
            alignItems: "center",
          }}
        >
          <BottomNavigationAction
            label="Home"
            icon={<Home />}
            onClick={() => {
              navigate("/");
            }}
          />
          <BottomNavigationAction
            label="Products"
            icon={
              <Badge badgeContent={productCount} color="primary">
                <AccountBalanceWalletIcon />
              </Badge>
            }
            onClick={() => {
              navigate("/vendor/products");
            }}
          />
        </BottomNavigation>
      </Box>
    );
  } else {
    return null;
  }
}
