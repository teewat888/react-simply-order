import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import { SearchBox } from "../form/SearchBox";
import { OrderForm } from "./OrderForm";
import { getOrder, orderActions, updateOrder } from "../../store/order-slice";
import { OrderHead } from "./OrderHead";
import { useParams } from "react-router-dom";
import { SkeletonLoading } from "../layout/SkeletonLoading";
import { getAvendor } from "../../store/vendor-slice";

// to take care new & edit order , received from OrderTemplate & MyOrder
let firstLoad = true;

export const Order = (props) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.id);
  const order = useSelector((state) => state.order.order);
  //const orderId = order.id;
  const [expanded, setExpanded] = React.useState(false); //accordian state
  const [searchTerm, setSearchTerm] = useState("");
  const { order_id } = useParams();
  const orderDetailsOrg = order.order_details;
  const [orderDetails, setOrderDetails] = useState(orderDetailsOrg);
  const isLoading = useSelector((state) => state.order.isLoading);
  const fetchFlag = useSelector((state) => state.order.fetchSuccess);
  const currentVendor = useSelector((state) => state.vendor.currentVendor);
  //state for current order heading
  const [heading, setHeading] = useState({
    id: order_id,
    order_date: order.order_date,
    delivery_date: order.delivery_date,
    order_ref: order.order_ref,
    comment: order.comment,
    user_id: userId,
    vendor_id: order.vendor_id,
  });

  //combine heading and details
  const [orderInfo, setOrderInfo] = useState({
    ...heading,
    order_details: orderDetails,
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleQuantity = (e) => {
    //handle quantity input box
    setOrderDetails(
      orderDetails.map((item) => {
        if (item.id === parseInt(e.target.id)) {
          return { ...item, qty: e.target.value };
        } else {
          return item;
        }
      })
    );
  };

  const handleChange = (e) => {
    setHeading({ ...heading, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    console.log("suppose to call first", userId, order_id);
    //dispatch(getOrder(userId, order_id));
    console.log("order here->", order);
  }, []);

  // once each input update , update order info
  useEffect(() => {
    setOrderInfo({ ...heading, order_details: orderDetails });
  }, [heading, orderDetails]);

  // update orderInfo state
  useEffect(() => {
    if (!firstLoad) {
      //prevent first load execute
      console.log("not first load");
      console.log("ordrInfo->", orderInfo);
      dispatch(getAvendor(order.vendor_id));
      dispatch(orderActions.setOrder(orderInfo));
      dispatch(updateOrder(order_id, orderInfo, userId, order.vendor_id));
    }
    firstLoad = false;
  }, [orderInfo]);

  if (isLoading) {
    return <SkeletonLoading />;
  }
  if (!currentVendor) {
    return null;
  }
  return (
    <>
      {/* {isLoading && <SkeletonLoading />} */}
      {heading && (
        <Box sx={{ width: "90%", bgcolor: "background.paper" }}>
          <OrderHead
            handleExpand={handleExpand}
            handleChange={handleChange}
            heading={heading}
            expanded={expanded}
            currentVendor={currentVendor}
          />
          <Box sx={{ textAlign: "center" }}>
            <SearchBox
              handleSearch={handleSearch}
              searchTerm={searchTerm}
              label="Search order"
            />
          </Box>

          <List>
            <OrderForm
              handleQuantity={handleQuantity}
              orderDetails={orderDetails}
            />
          </List>
        </Box>
      )}
    </>
  );
};
