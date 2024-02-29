import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const initialState = {
    country: '',
    AiResponse: '',
    description: '',
    ingredients: [],
    instructions: [],
    dish: '',
    customLocation: '',
    fetchingData: false,
    customDish: '',
    customDescription: '',
    customIngredients: [],
    customInstructions: [],
    customFetchingData: false,
    customAiResponse: '',
  }  
  const [globalState, setGlobalState] = useState(initialState);

  return (
    <AppContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </AppContext.Provider>
  );
};