import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";


const Logout = () => {
  const { logout } = useAuth0();
  useEffect(() => {
    logout({
      returnTo: window.location.origin, 
      client_id: 'MjWo6ad1gPBTpRUA2JLTqsiNBfVHf7SJ' 
    });
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      Logging Out...
    </div>
  );

};

export default Logout;
