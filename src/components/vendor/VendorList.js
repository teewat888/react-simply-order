import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVendors } from "../../store/vendor-slice";
import { Vendor } from "./Vendor";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { SkeletonLoading } from "../layout/SkeletonLoading";

const VendorList = () => {
  const vendors = useSelector((state) => state.vendor.vendorList);
  const isLoading = useSelector((state) => state.vendor.dispatch);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("useeffect call");
    dispatch(getVendors());
  }, [dispatch]);
  //create multiple skeltons

  // const skeletons = [];
  // for (let i = 1; i < 25; i++) {
  //   skeletons.push(<Skeleton key={i} />);
  // }
  console.log("vendors : ", vendors);
  return (
    <>
      {isLoading && <SkeletonLoading />}

      <Box sx={{ width: "90%", bgcolor: "background.paper" }}>
        <List>
          {vendors.map((vendor) => (
            <Vendor key={vendor.id} vendor={vendor} />
          ))}
        </List>
      </Box>
    </>
  );
};

export default VendorList;
