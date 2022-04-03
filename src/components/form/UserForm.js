import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const UserForm = ({ title, current_user, mode, handleSubmit }) => {
  const [user, setUser] = useState({
    ...current_user,
  });

  console.log("current user=>", user);
  const navigate = useNavigate();
  const errors = useSelector((state) => state.auth.errors);
  let formItems = [];
  let hasErrors = false;

  if (Object.keys(errors).length !== 0) {
    hasErrors = true;
    formItems = [
      "first_name" in errors
        ? {
            error: true,
            label: "First Name",
            id: "first_name",
            value: user.first_name,
            helperText: errors.first_name[0],
          }
        : { label: "First Name", id: "first_name", value: user.first_name },
      "last_name" in errors
        ? {
            error: true,
            label: "Last Name",
            id: "last_name",
            value: user.last_name,
            helperText: errors.last_name[0],
          }
        : { label: "Last Name", id: "last_name", value: user.last_name },
      "email" in errors
        ? {
            error: true,
            label: "Email",
            id: "email",
            value: user.email,
            helperText: errors.email[0],
          }
        : { label: "Email", id: "email", value: user.email },
      "contact_number" in errors
        ? {
            error: true,
            label: "Contact number",
            id: "contact_number",
            value: user.contact_number,
            helperText: errors.contact_number[0],
          }
        : {
            label: "Contact number",
            id: "contact_number",
            value: user.contact_number,
          },
      "company_name" in errors
        ? {
            error: true,
            label: "Company",
            id: "company_name",
            value: user.company_name,
            helperText: errors.company_name[0],
          }
        : { label: "Company", id: "company_name", value: user.company_name },
      "address_number" in errors
        ? {
            error: true,
            label: "Address #",
            id: "address_number",
            value: user.address_number,
            helperText: errors.address_number[0],
          }
        : {
            label: "Address #",
            id: "address_number",
            value: user.address_number,
          },
      "address_street" in errors
        ? {
            error: true,
            label: "Street",
            id: "address_street",
            value: user.address_street,
            helperText: errors.address_street[0],
          }
        : { label: "Street", id: "address_street", value: user.address_street },
      "address_suburb" in errors
        ? {
            error: true,
            label: "Suburb",
            id: "address_suburb",
            value: user.address_suburb,
            helperText: errors.address_suburb[0],
          }
        : { label: "Suburb", id: "address_suburb", value: user.address_suburb },
      "address_state" in errors
        ? {
            error: true,
            label: "State",
            id: "address_state",
            value: user.address_state,
            helperText: errors.address_state[0],
          }
        : { label: "State", id: "address_state", value: user.address_state },
    ];
  } else {
    hasErrors = false;
    formItems = [
      {
        label: "First Name",
        id: "first_name",
        value: user.first_name,
      },
      {
        label: "Last Name",
        id: "last_name",
        value: user.last_name,
      },
      { label: "Email", id: "email", value: user.email },
      {
        label: "Contact number",
        id: "contact_number",
        value: user.contact_number,
      },
      {
        label: "Company",
        id: "company_name",
        value: user.company_name,
      },
      {
        label: "Address #",
        id: "address_number",
        value: user.address_number,
      },
      {
        label: "Street",
        id: "address_street",
        value: user.address_street,
      },
      {
        label: "Suburb",
        id: "address_suburb",
        value: user.address_suburb,
      },
      {
        label: "State",
        id: "address_state",
        value: user.address_state,
      },
    ];
  }

  const handleOnChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };
  console.log("form items=> ", formItems);
  return (
    <>
      <Container sx={{ maxwidth: "95%", mt: "1em" }}>
        <Typography variant="h6">{title}</Typography>
        <Box component="form">
          {formItems.map((formItem) =>
            hasErrors ? (
              formItem.error ? (
                <TextField
                  error
                  key={formItem.id}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  label={formItem.label}
                  id={formItem.id}
                  value={formItem.value}
                  size="small"
                  margin="normal"
                  onChange={handleOnChange}
                  helperText={formItem.helperText}
                />
              ) : (
                //this field has no error
                <TextField
                  key={formItem.id}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  label={formItem.label}
                  id={formItem.id}
                  value={formItem.value}
                  size="small"
                  margin="normal"
                  onChange={handleOnChange}
                />
              )
            ) : (
              // no error at all
              <TextField
                key={formItem.id}
                InputLabelProps={{ shrink: true }}
                fullWidth
                label={formItem.label}
                id={formItem.id}
                value={formItem.value}
                size="small"
                margin="normal"
                onChange={handleOnChange}
              />
            )
          )}
          {mode !== "signup" ? (
            <>
              <Button
                variant="outlined"
                sx={{ mt: "1em" }}
                type="submit"
                onClick={handleSubmit}
              >
                Update details
              </Button>
              <Button
                variant="outlined"
                sx={{ mt: "1em", ml: "1em" }}
                type="submit"
                onClick={() => {
                  navigate("/");
                }}
              >
                Cancle
              </Button>
            </>
          ) : (
            ""
          )}
          {mode === "signup" && (
            <>
              {errors.password ? (
                <TextField
                  error
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  label="Password"
                  id="password"
                  value={user.password}
                  size="small"
                  margin="normal"
                  type="password"
                  onChange={handleOnChange}
                  helperText={errors.password[0]}
                />
              ) : (
                <TextField
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  label="Password"
                  id="password"
                  value={user.password}
                  size="small"
                  margin="normal"
                  type="password"
                  onChange={handleOnChange}
                />
              )}

              <input
                type="hidden"
                id="role_id"
                name="role_id"
                value={user.role_id}
              />
              <Button
                variant="outlined"
                sx={{ mt: "1em" }}
                type="submit"
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
              <Button
                variant="outlined"
                sx={{ mt: "1em", ml: "1em" }}
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Grid container sx={{ mt: "1em" }}>
                <Grid item xs></Grid>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Already have an account? Log in"}
                  </Link>
                </Grid>
              </Grid>
            </>
          )}
        </Box>
      </Container>
    </>
  );
};
