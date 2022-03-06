import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DataService from "../../lib/dataService";

export default function Profile() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    DataService.fetchProfile()
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          setUser(data.user);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <div>Profile</div>
      <div>{user.email}</div>
    </>
  );
}
