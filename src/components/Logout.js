import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";


// when in local environment, still logging out to vercel url. there doesn't seem to be a fix. best to quit coding altogether
const Logout = () => {
  const { logout } = useAuth0();
  useEffect(() => {
    logout({
      returnTo: window.location.origin, 
      client_id: 'MjWo6ad1gPBTpRUA2JLTqsiNBfVHf7SJ' 
    });
    
  }, [])
  return (
    <div>
      Logging Out...
    </div>
  );
};

export default Logout;
