import React from "react";
import { AppContext } from "../state/context";
import countries from "../data/countries.json";
import { generateRecipe } from "../API/openAI";

export default function Compass () {
    const { globalState, setGlobalState } = React.useContext(AppContext);
    const country = globalState.country
    const pickRandomCountry = () => {
        const randomIndex = Math.floor(Math.random() * countries.length)
        const randomCountry = countries[randomIndex]
        setGlobalState({ ...globalState, country: randomCountry })
    }
    return (
        <div className="compass-container">
            <h1>Compass</h1>
            <p>Country: {country}</p>
            <p>{globalState.AiResponse}</p>
            <button onClick={pickRandomCountry}>Get Random Country</button>
            <button onClick={() => generateRecipe(globalState, setGlobalState)}>Generate Recipe</button>
        </div>
    )
}