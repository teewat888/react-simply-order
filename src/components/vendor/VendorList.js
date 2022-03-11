import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVendors } from "../../store/vendor-slice";
import Skeleton from "@mui/material/Skeleton";
import { Vendor } from "./Vendor";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const VendorList = () => {
  const vendors = useSelector((state) => state.vendor.vendorList);
  const isLoading = useSelector((state) => state.vendor.dispatch);
  const dispatch = useDispatch();
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      fontWeight: "bold",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  useEffect(() => {
    console.log("useeffect call");
    dispatch(getVendors());
  }, [dispatch]);
  //create multiple skeltons

  const skeletons = [];
  for (let i = 1; i < 25; i++) {
    skeletons.push(<Skeleton key={i} />);
  }
  console.log("vendors : ", vendors);
  return (
    <>
      {isLoading ? (
        <>
          <Box sx={{ width: "80%", height: "100%", mt: "2em" }}>
            {skeletons}
          </Box>
        </>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ width: "100%" }} aria-label="simple table">
              <TableHead sx={{ fontWeight: "bold" }}>
                <TableRow>
                  <StyledTableCell>Vendor List</StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vendors.map((vendor) => (
                  <Vendor key={vendor.id} vendor={vendor} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};

export default VendorList;
