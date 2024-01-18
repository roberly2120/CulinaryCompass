import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { readUserDocuments, deleteDocument } from "../FireStore/firestoreOperations";
import { useAuth0 } from "@auth0/auth0-react";

export default function MyRecipes () {
    const [ recipes, setRecipes ] = useState([]);
    const [pageNotice, setPageNotice] = useState('') 
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
    const handleDeleteRecipe = async (id) => {
        await deleteDocument('recipes', id);
        setRecipes(recipes.filter(recipe => recipe.id !== id));
    }
    
    if(!recipes.length) {
        return (
            <div className="myrecipes-container">
                <h1>My Recipes</h1>
                <p className="page-notice">You have not saved any recipes yet!</p>
            </div>
        )
    }
    return (
        <div className="myrecipes-container">
            <h1>My Recipes</h1>
            <p className="page-notice">{pageNotice}</p>
            {recipes.map((recipe, index) => {
                return (
                    <div className='recipe-blurb' key={index}>
                        <h2 className="myrecipes-dish">{recipe.dish}</h2>
                        {' '}
                        <h2> from </h2>
                        {' '}
                        <h2 className="myrecipes-country">{recipe.country}</h2>
                        <div className="myrecipes-goto-recipe-button" onClick={()=> navigate(`/saved-recipe/${recipe.id}`)}>
                            <p>VIEW RECIPE</p>
                        </div>
                        <div className="myrecipes-delete-recipe-button" onClick={() => {handleDeleteRecipe(recipe.id)}}>DELETE</div>
                    </div>
                )
            })}
        </div>
    )
}