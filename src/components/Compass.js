import React, { useState } from "react";
import { AppContext } from "../state/context";
import countries from "../data/countries.json";

export default function Compass () {
    const { globalState } = React.useContext(AppContext);
    const [country, setCountry] = useState('')
    const pickRandomCountry = () => {
        const randomIndex = Math.floor(Math.random() * countries.length)
        return countries[randomIndex]
    }
    return (
        <div className="compass-container">
            <h1>Compass</h1>
            <p>Country: {country}</p>
            <button onClick={() => setCountry(pickRandomCountry())}>Get Random Country</button>
        </div>
    )
}