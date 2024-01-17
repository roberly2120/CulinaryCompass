import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Logout = () => {
  const { logout } = useAuth0();
  useEffect(() => {
    console.log('env variable', process.env.REACT_APP_BASE_URL)
    logout({ returnTo: process.env.REACT_APP_BASE_URL })
  }, [])
  return (
    <div>
      Logging Out...
    </div>
  );
};

export default Logout;
