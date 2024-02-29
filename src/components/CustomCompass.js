import React, { useState, useEffect } from "react";
import { AppContext } from "../state/context";
import CustomIngredients from "./recipe/CustomIngredents";
import CustomInstructions from "./recipe/CustomInstructions";
import { generateRecipe, generateCustomRecipe } from "../API/openAI";
import { createNewRecipeSave } from "../FireStore/eventHandlers";
import { useAuth0 } from "@auth0/auth0-react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../FireStore/firestore";


export default function CustomCompass() {
    const [customPageNotice, setCustomPageNotice] = useState('')
    const [locationInput, setLocationInput] = useState('')
    const { globalState, setGlobalState } = React.useContext(AppContext);
    const{customLocation, customDish, customDescription, customIngredients, customInstructions, customFetchingData } = globalState
    const { user } = useAuth0();
    const userID = user.sub;

    useEffect(() => {
        if (globalState.customFetchingData) {
            generateCustomRecipe(globalState, setGlobalState);
        }
    }, [globalState.customLocation, globalState.customFetchingData]);
    
    const handleGenerateRecipe = (globalState, setGlobalState) => {
        if(!locationInput.length) {
            setCustomPageNotice('Please type in a location before you generate a recipe!')
            setTimeout(() => setCustomPageNotice(''), 5000)
            return
        } else {
            setGlobalState({ ...globalState, customFetchingData: true, customLocation: locationInput })
            setLocationInput('')
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }
    // const handleSaveRecipe = async () => {
    //     let timeoutId
    //     if (!dish.length) {
    //         setPageNotice('You must generate a recipe before you can save it!')
    //         timeoutId = setTimeout(() => setPageNotice(''), 5000)
    //     } else {
    //         const recipeRef = collection(db, 'recipes');
    //         const q = query(recipeRef, where('dish', '==', dish), where('userID', '==', userID));
    //         const querySnapshot = await getDocs(q);
    //         if (querySnapshot.size) {
    //             setPageNotice('You have already saved this recipe!')
    //             setTimeout(() => setPageNotice(''), 5000)
    //         } else {
    //             createNewRecipeSave(country, dish, description, ingredients, instructions, userID)
    //             setPageNotice('Your recipe has been saved!')
    //             setTimeout(() => setPageNotice(''), 5000)
    //         }
    //     }
    //     return () => clearTimeout(timeoutId)
    // }

    return (
        <div className="compass-container">
            {/* <h1>Compass</h1> */}
            <h3>Enter a location in the text box below and see what kinds of interesting recipes the robots can build for you!</h3>
            <h3>Enjoy your cooking challenge!</h3>
            <p>Please be patient with the robots as they hand-craft your bespoke recipe. The robots are slow, but we love them.</p>
            <p className="page-notice">{customPageNotice}</p>
            <div className='location-input-container'>
            <input type='text' placeholder='Enter a location...' value={locationInput} onChange={(e) => setLocationInput(e.target.value)} />
            </div>
            <button
                className='compass-button button'
                disabled={customFetchingData || !locationInput.length}
                onClick={() => handleGenerateRecipe(globalState, setGlobalState)}
            >
                Generate Recipe
            </button>
            {/* <button 
                className='compass-button button'
                disabled={fetchingData && !dish.length}
                onClick={() => handleSaveRecipe()} 
            >
                Save to My Recipes
            </button> */}
            {/* changed 'fetching recipe' to spans so i could individually animate letters */}
            <p className="fetching-recipe">
                {globalState.customFetchingData ? '...fetching recipe...'.split('').map((char, index) => (
                    <span key={index}>{char}</span>
                )) : ''}
            </p>

            <p className="compass-country">Location: </p>
            <h3>{customDish.length ? `Your Global Dish Challenge is ${customDish}!` : ''}</h3>
            <p>{customDescription}</p>
            <CustomIngredients />
            <CustomInstructions />

            <div onClick={() => scrollToTop()} className="scroll-top-button button">Scroll To Top</div>

        </div>
    )
}