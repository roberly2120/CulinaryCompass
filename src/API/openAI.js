import OpenAI from 'openai';




const key = process.env.REACT_APP_OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: key, dangerouslyAllowBrowser: true })

export const generateRecipe = async (globalState, setGlobalState) => {
    
    try {
      
const promptFormatted = `Please give me a recipe for a main course that is traditionally or commonly eaten in the country of ${globalState.country}. Format the response as a JSON object with the following structure:

{
  "Dish": "Name of the dish",
  "Description": "A brief description of the dish",
  "Recipe": {
    "Ingredients": ["List", "of", "ingredients"],
    "Instructions": ["Step-by-step", "cooking", "process"]
  }
}`;
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: `${promptFormatted}` }],
            model: "gpt-3.5-turbo",
            presence_penalty: 0.6,
            // presence penalty to encourage more varied responses. may only have an effect in the same session though
        });

        const res = JSON.parse(completion.choices[0].message.content)
        const recipe = res.Recipe
        const ingredients = recipe.Ingredients
        const description = res.Description
        const instructions = recipe.Instructions
        const dish = res.Dish
        
        setGlobalState({
          ...globalState,
          AiResponse: completion.choices[0].message.content,
          description: description,
          ingredients: ingredients,
          instructions: instructions,
          dish: dish,
          fetchingData: false
          });
    } catch (error) {
        console.error(error)
    }
};
export const generateCustomRecipe = async (globalState, setGlobalState) => {
    
  try {
    console.log('globalState.customLocation', globalState.customLocation)
const promptFormatted = `Please give me a recipe for a main course that is commonly eaten in  ${globalState.customLocation}. Format the response as a JSON object with the following structure:

{
"Dish": "Name of the dish",
"Description": "A brief description of the dish",
"Recipe": {
  "Ingredients": ["List", "of", "ingredients"],
  "Instructions": ["Step-by-step", "cooking", "process"]
}
}`;
      const completion = await openai.chat.completions.create({
          messages: [{ role: "system", content: `${promptFormatted}` }],
          model: "gpt-3.5-turbo",
          presence_penalty: 0.6,
          // presence penalty to encourage more varied responses. may only have an effect in the same session though
      });

      const res = JSON.parse(completion.choices[0].message.content)
      const recipe = res.Recipe
      const ingredients = recipe.Ingredients
      const description = res.Description
      const instructions = recipe.Instructions
      const dish = res.Dish
      
      setGlobalState({
        ...globalState,
        customAiResponse: completion.choices[0].message.content,
        customDescription: description,
        customIngredients: ingredients,
        customInstructions: instructions,
        customDish: dish,
        customFetchingData: false
        });
  } catch (error) {
      console.error(error)
  }
};
