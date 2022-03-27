import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../store/auth-slice";
import { UserForm } from "../form/UserForm";

export function Profile() {
  const current_user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  console.log("current_usr-profile->", current_user);
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
    };
    dispatch(updateProfile(data, current_user.id));
  };
  return (
    <>
      <UserForm
        title="Profile"
        current_user={current_user}
        mode="profile"
        handleSubmit={handleSubmit}
      />
    </>
  );
}
