import React from "react";

import { useSelector } from "react-redux";
import { UserForm } from "../form/UserForm";

export function Profile() {
  const current_user = useSelector((state) => state.auth.user);
  const handleSubmit = (e) => {
    e.preventDefault();
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
