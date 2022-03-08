import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataService from "../../lib/dataService";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";

export default function Profile() {
  const [user, setUser] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    address_number: "",
    address_street: "",
    address_suburb: "",
    address_state: "",
    contact_number: "",
  });

  const formItems = [
    { label: "First Name", id: "first_name", value: user.first_name },
    { label: "Last Name", id: "last_name", value: user.last_name },
    { label: "Email", id: "email", value: user.email },
    {
      label: "Contact number",
      id: "contact_number",
      value: user.contact_number,
    },
    { label: "Company", id: "company_name", value: user.company_name },
    { label: "Address #", id: "address_number", value: user.address_number },
    { label: "Street", id: "address_street", value: user.address_street },
    { label: "Suburb", id: "address_suburb", value: user.address_suburb },
    { label: "State", id: "address_state", value: user.address_state },
  ];

  useEffect(() => {
    DataService.fetchProfile()
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          console.log("fet profile");
          setUser(data.user);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  const handleOnChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  return (
    <>
      <Container sx={{ maxwidth: "95%", mt: "1em" }}>
        <Typography variant="h6">Profile</Typography>
        <Box component="form">
          {formItems.map((formItem) => (
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
          ))}
        </Box>
      </Container>
    </>
  );
}
