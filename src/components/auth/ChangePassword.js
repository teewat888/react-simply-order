import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import authService from "../../lib/authService";
import { errCatch } from "../../lib/helper";
import {
  handleDataErrMsg,
  handleDataSuccessMsg,
} from "../../lib/handleDataMsg";

export const ChangePassword = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [passwordObj, setPasswordObj] = useState({
    currentPass: "",
    newPass: "",
    confirmNewPass: "",
  });
  const handleOnChange = (e) => {
    setPasswordObj({ ...passwordObj, [e.target.id]: e.target.value });
    dispatch(uiActions.clear());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordObj.newPass.trim().length < 4) {
      dispatch(
        uiActions.showNotification({
          text: "Password need at least 4 charactors",
          status: "error",
        })
      );
      return;
    } else if (passwordObj.newPass !== passwordObj.confirmNewPass) {
      dispatch(
        uiActions.showNotification({
          text: "Password and confirm password is not match",
          status: "error",
        })
      );
      return;
    }
    authService
      .fetchChangePass(passwordObj, user.id)
      .then((data) => {
        if (data.success) {
          handleDataSuccessMsg(dispatch, data)();
        } else {
          handleDataErrMsg(dispatch, data)();
        }
      })
      .catch(errCatch);
  };

  return (
    <>
      <Container sx={{ maxwidth: "95%", mt: "1em" }}>
        <Typography variant="h6">Change Password</Typography>
        <Box component="form">
          <TextField
            InputLabelProps={{ shrink: true }}
            fullWidth
            label="Current Password"
            id="currentPass"
            value={passwordObj.currentPass}
            size="small"
            margin="normal"
            type="password"
            onChange={handleOnChange}
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            fullWidth
            label="New Password"
            id="newPass"
            value={passwordObj.newPass}
            size="small"
            margin="normal"
            type="password"
            onChange={handleOnChange}
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            fullWidth
            label="Confirm Password"
            id="confirmNewPass"
            value={passwordObj.confirmNewPass}
            size="small"
            margin="normal"
            type="password"
            onChange={handleOnChange}
          />
          <Button
            variant="outlined"
            sx={{ mt: "1em" }}
            type="submit"
            onClick={handleSubmit}
          >
            Change Password
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
