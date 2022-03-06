import React from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";

export default function Logout() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(authActions.logout());
  };
  return <button onClick={handleLogout}>Logout</button>;
}
