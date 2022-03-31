import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { validateEmail } from "../../lib/validation";
import authService from "../../lib/authService";
import { errCatch } from "../../lib/helper";
import {
  handleDataErrMsg,
  handleDataSuccessMsg,
} from "../../lib/handleDataMsg";
import { SkeletonLoading } from "../layout/SkeletonLoading";
import { delay } from "../../utils/delay";

export const ForgotPassword = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleOnChange = (e) => {
    setEmail(e.target.value);
    dispatch(uiActions.clear());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(dispatch, email)) {
      setIsLoading(true);
      authService
        .fetchForgotPass(email)
        .then((data) => {
          setIsLoading(false);
          console.log("any thing here", data);
          if (data.success) {
            handleDataSuccessMsg(dispatch, data)();
            delay(1500).then(() => navigate("/"));
          } else {
            handleDataErrMsg(dispatch, data)();
          }
        })
        .catch(errCatch);
    }
  };

  if (isLoading) {
    return <SkeletonLoading />;
  }

  return (
    <>
      <Container sx={{ maxwidth: "95%", mt: "1em" }}>
        <Typography variant="overline">
          Forgot Password?, please provide the email you registered with us and
          follow the instruction in the email.
        </Typography>
        <Box component="form">
          <TextField
            InputLabelProps={{ shrink: true }}
            fullWidth
            label="Email"
            id="email"
            value={email}
            size="small"
            margin="normal"
            type="email"
            onChange={handleOnChange}
          />

          <Button
            variant="outlined"
            sx={{ mt: "1em" }}
            type="submit"
            onClick={handleSubmit}
          >
            Request reset password
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
        </Box>
      </Container>
    </>
  );
};
