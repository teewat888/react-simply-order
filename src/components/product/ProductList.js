import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/product-slice";
import { Product } from "./Product";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export default function MyProducts() {
  const products = useSelector((state) => state.product.productList);
  const isLoading = useSelector((state) => state.product.isLoading);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.id);
  const role = useSelector((state) => state.auth.user.role);
  const navigate = useNavigate();
  const [productResult, setProductResult] = useState(products);
  const [checked, setChecked] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  //style for FAB plus sign
  const style = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 100,
    left: "auto",
    position: "fixed",
  };
  //heading style
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      fontWeight: "bold",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const handleChange = (e) => {
    setChecked(e.target.checked);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleFabClick = () => {
    navigate("/vendor/products/new");
  };

  useEffect(() => {
    dispatch(getProducts(userId));
  }, [dispatch]);
  console.log("products: ", products);
  useEffect(() => {
    if (checked) {
      const res = products.filter((product) => {
        return (
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          product.available
        );
      });
      setProductResult([...res]);
    } else {
      const res_all = products.filter((product) => {
        return product.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setProductResult([...res_all]);
    }
  }, [checked, searchTerm]);
  console.log("products result: ", productResult);
  //create multiple skeltons
  const skeletons = [];
  for (let i = 1; i < 25; i++) {
    skeletons.push(<Skeleton key={i} />);
  }

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
          <TextField
            id="search"
            label=""
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
            variant="standard"
            value={searchTerm}
          />
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Show only available product"
            />
          </FormGroup>
          <TableContainer component={Paper}>
            <Table sx={{ width: "100%" }} aria-label="simple table">
              <TableHead sx={{ fontWeight: "bold" }}>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productResult.map((product) => (
                  <Product key={product.id} product={product} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
      )}
    </>
  );
}
