import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home () {
    const navigate = useNavigate()

    return (
        <div className="home-container">
            <h1>Welcome to the Culinary Compass</h1>
            <h2>This is a fun way to learn to cook dishes from around the world!</h2>
            <h3>Click the 'Compass' button in the nav bar to discover a new recipes from around the world!</h3>
            <div onClick={() => navigate('/compass')} className="home-nav-to-compass">Go to Compass</div>
        </div>
    )
}