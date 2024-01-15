import React from "react";
import LoginButton from "./LoginButton";

export default function LandingPage() {
    return (
        <div className="landing-page-container">
            <h1>Welcome to Culinary Compass</h1>
            <h3>Please Log In to continue</h3>
            <LoginButton />
        </div>
    )
}