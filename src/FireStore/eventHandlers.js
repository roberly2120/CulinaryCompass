import { createDocument } from "./firestoreOperations"







export const createNewRecipeSave = async (country, dish, description, ingredients, instructions, userID) => {
    
    const recipe = {
        country: country,
        dish: dish,
        description: description,
        ingredients: ingredients,
        instructions: instructions,
        userID: userID
    }
    try {
        await createDocument('recipes', recipe)
    } catch (error) {
        console.error(error)
    }
}