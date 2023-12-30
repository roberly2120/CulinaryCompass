import OpenAI from 'openai';
import { AppContext } from '../state/context';



const key = process.env.REACT_APP_OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: key, dangerouslyAllowBrowser: true })

export const generateRecipe = async (globalState, setGlobalState) => {
    console.log(process.env.OPENAI_API_KEY)
    try {
        // const prompt = `Please give me a recipe for a main course that is traditionally or commonly eaten in the country of ${globalState.country}. begin with a description marked 'Description:' and then the recipe preceeded by 'Recipe:'`

//         const promptFormatted = `Please give me a recipe for a main course that is traditionally or commonly eaten in the country of ${globalState.country}. Format the response as follows:

// 1. Start with a section marked 'Description:', followed by a brief description of the dish.
// 2. Then, provide a section marked 'Recipe:', which should be structured into two sub-sections:
//    a. 'Ingredients:', listing all the ingredients required.
//    b. 'Instructions:', detailing the step-by-step cooking process.

// Present the information in a clear, structured format suitable for parsing into a JavaScript object with the following structure: an array with two elements, the first being the description and the second being an object containing the ingredients and instructions.`
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
        });

        const res = JSON.parse(completion.choices[0].message.content)
        const recipe = res.Recipe
        const ingredients = recipe.Ingredients
        const description = res.Description
        const instructions = recipe.Instructions
        const dish = res.Dish
        
        // console.log('res', res)
        setGlobalState({
          ...globalState,
          AiResponse: completion.choices[0].message.content,
          Description: description,
          Ingredients: ingredients,
          Instructions: instructions,
          Dish: dish
          });
    } catch (error) {
        console.error(error)
    }
};
