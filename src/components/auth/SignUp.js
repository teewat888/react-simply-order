import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doSignup } from "../../store/auth-slice";
import { UserForm } from "../form/UserForm";

export const SignUp = ({ role }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  const current_user = {
    first_name: "",
    last_name: "",
    email: "",
    address_number: "",
    address_street: "",
    address_suburb: "",
    address_state: "",
    contact_number: "",
    company_name: "",
    password: "",
    role_id: role,
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [dispatch, isLoggedIn]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      first_name: e.target.form.first_name.value,
      last_name: e.target.form.last_name.value,
      email: e.target.form.email.value,
      address_number: e.target.form.address_number.value,
      address_street: e.target.form.address_street.value,
      address_suburb: e.target.form.address_suburb.value,
      address_state: e.target.form.address_state.value,
      contact_number: e.target.form.contact_number.value,
      company_name: e.target.form.company_name.value,
      password: e.target.form.password.value,
      role_id: parseInt(e.target.form.role_id.value),
    };
    dispatch(doSignup(data));
  };

  return (
    <>
      <UserForm
        title={role === 2 ? "Vendor Sign up" : "Sign up"}
        current_user={current_user}
        mode="signup"
        handleSubmit={handleSubmit}
      />
    </>
  );
};
