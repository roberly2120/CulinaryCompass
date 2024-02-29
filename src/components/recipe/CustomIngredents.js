import React from "react";
import { AppContext } from "../../state/context";



export default function CustomIngredients () {
    const { globalState } = React.useContext(AppContext);
    const ingredients = globalState.customIngredients

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