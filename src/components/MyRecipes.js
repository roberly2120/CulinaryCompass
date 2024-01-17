import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { readUserDocuments } from "../FireStore/firestoreOperations";
import { useAuth0 } from "@auth0/auth0-react";

export default function MyRecipes () {
    const [ recipes, setRecipes ] = useState([]);
    const { user } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipes = async () => {
            const userRecipes = await readUserDocuments('recipes', user.sub)
            setRecipes(userRecipes);
        };
        fetchRecipes();
    }, [user.sub])
    // useEffect(() => {
    //     console.log(recipes)
    // }, [recipes])
    
    
    return (
        <div className="myrecipes-container">
            <h1>My Recipes</h1>
            {recipes.map((recipe, index) => {
                return (
                    <div className='recipe-blurb' key={index}>
                        <h2 className="myrecipes-dish">{recipe.dish}</h2>
                        {' '}
                        <h2> from </h2>
                        {' '}
                        <h2 className="myrecipes-country">{recipe.country}</h2>
                        <div className="myrecipes-goto-recipe-button" onClick={()=> navigate(`/saved-recipe/${recipe.id}`)}>
                            <p>View Recipe</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}