import React from "react";
import { AppContext } from "../../state/context";
import test_data from "../../data/placeHolder_data.json"


export default function Ingredients () {
    const { globalState, setGlobalState } = React.useContext(AppContext);
    // const ingredients = test_data.Recipe.Ingredients
    const ingredients = globalState.Ingredients

    return (
        <div>
            <h3>{ingredients.length ? 'Ingredients' : ''}</h3>
            <ul>
                {ingredients.length ? ingredients.map((ingredient, idx) => {
                return <li key={idx}>{ingredient}</li>
            }) : ''}
            </ul>
        </div>
    )
}