import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home () {
    const navigate = useNavigate()

    return (
        <div className="home-container">
            <h1>Welcome to the Culinary Compass</h1>
            <h2>This site uses AI to generate recipes</h2>
            <h3>Click the button below to try new recipes from around the world!</h3>
            <div onClick={() => navigate('/compass')} className="home-nav-to-compass">Go to Compass</div>
        </div>
    )
}