import OpenAI from 'openai';
import { AppContext } from '../state/context';


const key = process.env.OPENAI_API_KEY;
const openai = new OpenAI({apiKey: key, dangerouslyAllowBrowser: true})

export const generateRecipe = async (globalState, setGlobalState) => {
    try {
        const prompt = `Please give me a recipe for a main course that is traditionally or commonly eaten in the country of ${globalState.country}. begin with a description marked 'Description:' and then the recipe preceeded by 'Recipe:'`
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: `${prompt}`}],
            model: "gpt-3.5-turbo",
        });
        console.log(completion.choices[0].message.content)
        setGlobalState({...globalState, AiResponse: completion.choices[0].message.content}) 
    } catch (error) {
        console.error(error)
    }
};
