import React from "react";
import { AppContext } from "../state/context";
import countries from "../data/countries.json";
import test_data from "../data/placeHolder_data.json"
import Ingredients from "./recipe/Ingredients";
import Instructions from "./recipe/Instructions";
import { generateRecipe } from "../API/openAI";

export default function Compass () {
    const { globalState, setGlobalState } = React.useContext(AppContext);
    const country = globalState.country
    const description = globalState.Description
    const dish = globalState.Dish
    // const description = test_data.Description
    // const dish = test_data.Dish

    const pickRandomCountry = () => {
        const randomIndex = Math.floor(Math.random() * countries.length)
        const randomCountry = countries[randomIndex]
        setGlobalState({ ...globalState, country: randomCountry })
    }
// got the response correct. need to set global variables and then use them here
    return (
        <div className="compass-container">
            <h1>Compass</h1>
            <h3>{dish.length ? `Your Global Dish Challenge is ${dish}!` : ''}</h3>
            <p>{description}</p>
            <Ingredients />
            <Instructions />
            <p>Country: {country}</p>

            <button onClick={pickRandomCountry}>Get Random Country</button>
            <button onClick={() => generateRecipe(globalState, setGlobalState)}>Generate Recipe</button>
        </div>
    )
}