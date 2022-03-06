import * as React from "react";

import { useLocation, useNavigate } from "react-router-dom";

export function RequireAuth({ children, isLoggedIn }) {
  let location = useLocation();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  return children;
}
