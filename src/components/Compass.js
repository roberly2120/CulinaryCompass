import React from "react";
import { AppContext } from "../state/context";
import countries from "../data/countries.json";
// import test_data from "../data/placeHolder_data.json"
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
    const handleGenerateRecipe = (globalState, setGlobalState) => {
        setGlobalState({...globalState, fetchingData: true})
        generateRecipe(globalState, setGlobalState)
    }
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }
    return (
        <div className="compass-container">
            <h1>Compass</h1>
            <h3>Use the buttons below to find a random country, then generate a recipe for a main dish that is commonly or traditionally eaten in that country. Enjoy your cooking challenge!</h3>
            <button className='compass-button button' onClick={pickRandomCountry}>Get Random Country</button>
            <button
                className='compass-button button' 
                disabled={globalState.fetchingData} 
                onClick={() => handleGenerateRecipe(globalState, setGlobalState)}
            >
            Generate Recipe
            </button>
            <p>{globalState.fetchingData ? '...fetching recipe...' : ''}</p>
            <p className="compass-country">Country: {country}</p>
            <h3>{dish.length ? `Your Global Dish Challenge is ${dish}!` : ''}</h3>
            <p>{description}</p>
            <Ingredients />
            <Instructions />
            
            <div onClick={() => scrollToTop()} className="scroll-top-button button">Scroll To Top</div>
            
        </div>
    )
}