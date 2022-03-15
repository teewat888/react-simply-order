import React from "react";

import { useSelector } from "react-redux";
import { UserForm } from "../form/UserForm";

export default function Profile() {
  const current_user = useSelector((state) => state.auth.user);

  return (
    <>
      <UserForm title="Profile" current_user={current_user} />
    </>
  );
}
