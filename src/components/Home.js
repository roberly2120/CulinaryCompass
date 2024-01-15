import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home () {
    const navigate = useNavigate()
    const { isAuthenticated, loginWithRedirect } = useAuth0()
    // isAuthenticated = true;

    useEffect(() => {
        if(!isAuthenticated) {
            loginWithRedirect();
        }
    }, [isAuthenticated, loginWithRedirect])

    return (
        <div className="home-container">
            <h1>Welcome to the Culinary Compass</h1>
            <h2>This site uses AI to generate recipes</h2>
            <h3>Click the button below to try new recipes from around the world!</h3>
            <div onClick={() => navigate('/compass')} className="home-nav-to-compass">Go to Compass</div>
        </div>
    )
}
// thisIsATestPassword1234!