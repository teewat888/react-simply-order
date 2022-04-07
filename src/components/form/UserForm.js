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
import { errorInputField, normalInputField } from "../../lib/formHelper";

export const UserForm = ({ title, current_user, mode, handleSubmit }) => {
  const [user, setUser] = useState({
    ...current_user,
  });

  console.log("current user=>", user);
  const navigate = useNavigate();
  const errors = useSelector((state) => state.auth.errors);
  let formItems = [];
  let hasErrors = false;
  //check any error from API
  if (Object.keys(errors).length !== 0) {
    hasErrors = true;
    formItems = [
      "first_name" in errors
        ? errorInputField(
            "First Name",
            "first_name",
            user.first_name,
            errors.first_name[0]
          )
        : normalInputField("First Name", "first_name", user.first_name),
      "last_name" in errors
        ? errorInputField(
            "Last Name",
            "last_name",
            user.last_name,
            errors.last_name[0]
          )
        : normalInputField("Last Name", "last_name", user.last_name),
      "email" in errors
        ? errorInputField("Email", "email", user.email, errors.email[0])
        : normalInputField("Email", "email", user.email),
      "contact_number" in errors
        ? errorInputField(
            "Contact number",
            "contact_number",
            user.contact_number,
            errors.contact_number[0]
          )
        : normalInputField(
            "Contact number",
            "contact_number",
            user.contact_number
          ),
      "company_name" in errors
        ? errorInputField(
            "Company",
            "company_name",
            user.company_name,
            errors.company_name[0]
          )
        : normalInputField("Company", "company_name", user.company_name),
      "address_number" in errors
        ? errorInputField(
            "Address #",
            "address_number",
            user.address_number,
            errors.address_number[0]
          )
        : normalInputField("Address #", "address_number", user.address_number),
      "address_street" in errors
        ? errorInputField(
            "Street",
            "address_street",
            user.address_street,
            errors.address_street[0]
          )
        : normalInputField("Street", "address_street", user.address_street),
      "address_suburb" in errors
        ? errorInputField(
            "Suburb",
            "address_suburb",
            user.address_suburb,
            errors.address_suburb[0]
          )
        : normalInputField("Suburb", "address_suburb", user.address_suburb),
      "address_state" in errors
        ? errorInputField(
            "State",
            "address_state",
            user.address_state,
            errors.address_state[0]
          )
        : normalInputField("State", "address_state", user.address_state),
    ];
  } else {
    hasErrors = false;
    formItems = [
      normalInputField("First Name", "first_name", user.first_name),
      normalInputField("Last Name", "last_name", user.last_name),
      normalInputField("Email", "email", user.email),
      normalInputField("Contact number", "contact_number", user.contact_number),
      normalInputField("Company", "company_name", user.company_name),
      normalInputField("Address #", "address_number", user.address_number),
      normalInputField("Street", "address_street", user.address_street),
      normalInputField("Suburb", "address_suburb", user.address_suburb),
      normalInputField("State", "address_state", user.address_state),
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
