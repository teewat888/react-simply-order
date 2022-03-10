import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { ProductItem } from "./ProductItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

export const Product = ({ products }) => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      fontWeight: "bold",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  console.log("products", products);
  const [productResult, setProductResult] = useState(products);
  const [checked, setChecked] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (e) => {
    setChecked(e.target.checked);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

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

  console.log("product_res: outside loop: ", productResult);
  return (
    <>
      {/* <Typography variant="h6">Products</Typography> */}
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
              <ProductItem key={product.id} product={product} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
