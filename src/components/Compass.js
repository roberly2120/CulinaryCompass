import React, { useState } from "react";
import { AppContext } from "../state/context";
import countries from "../data/countries.json";
// import test_data from "../data/placeHolder_data.json"
import Ingredients from "./recipe/Ingredients";
import Instructions from "./recipe/Instructions";
import { generateRecipe } from "../API/openAI";
import { createNewRecipeSave } from "../FireStore/eventHandlers";
import { useAuth0 } from "@auth0/auth0-react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../FireStore/firestore";


export default function Compass() {
    const [pageNotice, setPageNotice] = useState('')
    const { globalState, setGlobalState } = React.useContext(AppContext);
    const{ country, dish, description, ingredients, instructions, fetchingData } = globalState
    const { user } = useAuth0();
    const userID = user.sub;

    const pickRandomCountry = () => {
        const randomIndex = Math.floor(Math.random() * countries.length)
        const randomCountry = countries[randomIndex]
        setGlobalState({ ...globalState, country: randomCountry })
    }
    const handleGenerateRecipe = (globalState, setGlobalState) => {
        if(!country.length) {
            setPageNotice('You must select a country before you can generate a recipe!')
            setTimeout(() => setPageNotice(''), 5000)
            return
        } else {
            setGlobalState({ ...globalState, fetchingData: true })
            generateRecipe(globalState, setGlobalState)
        }
        
    }
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }
    const handleSaveRecipe = async () => {
        let timeoutId
        if (!dish.length) {
            setPageNotice('You must generate a recipe before you can save it!')
            timeoutId = setTimeout(() => setPageNotice(''), 5000)
        } else {
            const recipeRef = collection(db, 'recipes');
            const q = query(recipeRef, where('dish', '==', dish), where('userID', '==', userID));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.size) {
                setPageNotice('You have already saved this recipe!')
                setTimeout(() => setPageNotice(''), 5000)
            } else {
                createNewRecipeSave(country, dish, description, ingredients, instructions, userID)
                setPageNotice('Your recipe has been saved!')
                setTimeout(() => setPageNotice(''), 5000)
            }
        }
        return () => clearTimeout(timeoutId)
    }

    return (
        <div className="compass-container">
            {/* <h1>Compass</h1> */}
            <h3>Use the buttons below to find a random country, then generate a recipe for a main dish that is commonly or traditionally eaten in that country.</h3>
            <h3>Enjoy your cooking challenge!</h3>
            <p>Please be patient with the robots as they hand-craft your bespoke recipe. The robots are slow, but we love them.</p>
            <p className="page-notice">{pageNotice}</p>
            <button className='compass-button button' onClick={pickRandomCountry}>Get Random Country</button>
            <button
                className='compass-button button'
                disabled={fetchingData}
                onClick={() => handleGenerateRecipe(globalState, setGlobalState)}
            >
                Generate Recipe
            </button>
            <button 
                className='compass-button button'
                disabled={fetchingData && !dish.length}
                onClick={() => handleSaveRecipe()} 
            >
                Save to My Recipes
            </button>
            {/* changed 'fetching recipe' to spans so i could individually animate letters */}
            <p className="fetching-recipe">
                {globalState.fetchingData ? '...fetching recipe...'.split('').map((char, index) => (
                    <span key={index}>{char}</span>
                )) : ''}
            </p>

            <p className="compass-country">Country: {country}</p>
            <h3>{dish.length ? `Your Global Dish Challenge is ${dish}!` : ''}</h3>
            <p>{description}</p>
            <Ingredients />
            <Instructions />

            <div onClick={() => scrollToTop()} className="scroll-top-button button">Scroll To Top</div>

        </div>
    )
}