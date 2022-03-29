import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVendors } from "../../store/vendor-slice";
import { Vendor } from "./Vendor";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { SkeletonLoading } from "../layout/SkeletonLoading";
import { SearchBox } from "../form/SearchBox";
import { productActions } from "../../store/product-slice";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

export const VendorList = () => {
  const vendors = useSelector((state) => state.vendor.vendorList);
  const isLoading = useSelector((state) => state.vendor.dispatch);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [vendorsRes, setVendorsRes] = useState(vendors);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  useEffect(() => {
    const res = vendors.filter((vendor) =>
      vendor.company_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (searchTerm.length !== 0) {
      setVendorsRes([...res]);
    } else {
      setVendorsRes(vendors);
    }
  }, [searchTerm, vendors]);

  useEffect(() => {
    dispatch(getVendors());
    dispatch(productActions.resetFetchFlag());
  }, [dispatch]);

  if (!vendors) {
    return null;
  }
  return (
    <>
      <Typography variant="overline">
        Create <NoteAddIcon color={"primary"} sx={{ mb: "-0.2em" }} />
        order templates from the vendor
      </Typography>
      <SearchBox
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        label="Search vendor"
      />
      {isLoading ? (
        <SkeletonLoading />
      ) : (
        <Box sx={{ width: "90%", bgcolor: "background.paper" }}>
          <List>
            {vendorsRes.map((vendor) => (
              <Vendor key={vendor.id} vendor={vendor} />
            ))}
          </List>
        </Box>
      )}
    </>
  );
};
