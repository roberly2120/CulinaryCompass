import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { readDocument } from "../FireStore/firestoreOperations";


export default function SavedRecipe () {
    const { id } = useParams();
    const [ recipe, setRecipe ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            const recipeData = await readDocument('recipes', id);
            setRecipe(recipeData);
            setIsLoading(false);
        };
        fetchRecipe();
    }, [id])
    // useEffect(() => {
    //     console.log(recipe)
    // }, [recipe])
    
    if(isLoading) {
        return <div>Loading...</div>
    }
    return (
        <div className='saved-recipe-container'>
            <h2>Dish: {recipe.dish}</h2>
            <h2>Country: {recipe.country}</h2>
            <h4>{recipe.description}</h4>
            <h3>Ingredients</h3>
            {recipe.ingredients.map((ingredient, index) => {
                return (
                    <ul key={index}>
                        <li>{ingredient}</li>
                    </ul>
                )
            })}
            <h3>Instructions</h3>
            {recipe.instructions.map((step, index) => {
                return (
                    <ul key={index}>
                        <li>{step}</li>
                    </ul>
                )
            })}
        </div>
    )
}