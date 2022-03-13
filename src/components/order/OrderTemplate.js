import React, { useEffect } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/product-slice";

export const OrderTemplate = (props) => {
  const navigate = useNavigate();
  const { vendor_id } = useParams();
  const dispatch = useDispatch();

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
    dispatch(getProducts(vendor_id, "template"));
  }, []);

  const handleFabClick = () => {
    navigate(`/user/${user_id}/vendor/${vendor_id}/order_template/new`);
  };
  return (
    <>
      <div>Show order template list here , need to add templates lists</div>
      <Fab
        size="medium"
        color="primary"
        aria-label="add"
        style={style}
        onClick={handleFabClick}
      >
        <AddIcon />
      </Fab>
    </>
  );
};
