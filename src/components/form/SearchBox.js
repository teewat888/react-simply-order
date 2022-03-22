import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

export const SearchBox = ({ handleSearch, searchTerm, label }) => {
  return (
    <>
      <TextField
        id="search"
        label={label}
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
        sx={{ mt: "1em" }}
      />
    </>
  );
};
