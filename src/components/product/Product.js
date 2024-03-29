import React, { useEffect, useState } from "react";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { SearchBox } from "../form/SearchBox";

export const Product = ({ products }) => {
  const navigate = useNavigate();


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
    if (typeof products == "undefined") {
      navigate("/");
    }
  }, []);

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


  return (
    <>
      <SearchBox
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        label="Search Product"
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

      <Box sx={{ width: "90%", bgcolor: "background.paper" }}>
        <List>
          {productResult.map((product) => (
            <ListItemButton key={product.id}>
              <ListItemText>{product.name}</ListItemText>
              <IconButton
                aria-label="edit"
                color="primary"
                onClick={() => {
                  navigate(`/vendor/products/edit/${product.id}`);
                }}
              >
                <EditIcon />
              </IconButton>
            </ListItemButton>
          ))}
        </List>
      </Box>
    </>
  );
};
