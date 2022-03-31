import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import authService from "../../lib/authService";
import { errCatch } from "../../lib/helper";
import {
  handleDataErrMsg,
  handleDataSuccessMsg,
} from "../../lib/handleDataMsg";
import { delay } from "../../utils/delay";

export const ResetPassword = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useParams();
  const [passwordObj, setPasswordObj] = useState({
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
      .fetchResetPassword(passwordObj.newPass, token)
      .then((data) => {
        if (data.success) {
          handleDataSuccessMsg(dispatch, data)();
          delay(1500).then(() => navigate("/"));
        } else {
          handleDataErrMsg(dispatch, data)();
        }
      })
      .catch(errCatch);
  };

  return (
    <>
      <Container sx={{ maxwidth: "95%", mt: "1em" }}>
        <Typography variant="h6">Set new password</Typography>
        <Box component="form">
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
            Set new password
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
