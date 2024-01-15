import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Logout = () => {
  const { logout, isAuthenticated } = useAuth0();
  useEffect(() => {
    logout({ returnTo: window.location.origin })
  }, [])
  return (
    <div>
      Logging Out...
    </div>
  );
};

export default Logout;
