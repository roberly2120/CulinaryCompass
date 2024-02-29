import React, { useState } from "react";
import { AppContext } from "../state/context";
import countries from "../data/countries.json";
import Ingredients from "./recipe/Ingredients";
import Instructions from "./recipe/Instructions";
import { generateRecipe } from "../API/openAI";
import { createNewRecipeSave } from "../FireStore/eventHandlers";
import { useAuth0 } from "@auth0/auth0-react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../FireStore/firestore";
import { Center, Box, HStack, VStack, Button, Text, Heading, useToast, IconButton, Tooltip } from "@chakra-ui/react";
import { ChevronUpIcon, StarIcon } from "@chakra-ui/icons";

export default function Compass() {
    const [pageNotice, setPageNotice] = useState('');
    const [hoverState, setHoverState] = useState(false);
    const { globalState, setGlobalState } = React.useContext(AppContext);
    const { country, dish, description, ingredients, instructions, fetchingData } = globalState;
    const { user } = useAuth0();
    const userID = user.sub;

    const toast = useToast();

    const displayToast = (message, status = 'info') => {
        toast({
            title: message,
            status: status,
            duration: 5000,
            isClosable: true,
            position: "top"
        });
    };
    const displayFunnyToast = () => {
        toast({
            title: "Patience is a virtue!",
            description: "Please be patient with the robots as they hand-craft your bespoke recipe. The robots are slow, but we love them.",
            status: "info",
            duration: 6000,
            isClosable: true,
            position: "bottom-left"
        });
    };

    const pickRandomCountry = () => {
        const randomIndex = Math.floor(Math.random() * countries.length);
        const randomCountry = countries[randomIndex];
        setGlobalState({ ...globalState, country: randomCountry });
    };

    const handleGenerateRecipe = async () => {
        if (!country.length) {
            displayToast('You must select a country before you can generate a recipe!', 'warning');
            return;
        } else {
            displayFunnyToast();
            setGlobalState({ ...globalState, fetchingData: true });
            await generateRecipe(globalState, setGlobalState);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    };

    const handleSaveRecipe = async () => {
        if (!dish.length) {
            displayToast('You must generate a recipe before you can save it!', 'warning');
            return;
        }
        const recipeRef = collection(db, 'recipes');
        const q = query(recipeRef, where('dish', '==', dish), where('userID', '==', userID));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size) {
            displayToast('You have already saved this recipe!', 'warning');
        } else {
            await createNewRecipeSave(country, dish, description, ingredients, instructions, userID);
            displayToast('Your recipe has been saved!');
        }
    };

    return (
        <VStack spacing={4} className="compass-container" mt={5}>
            <Box bg="teal.50" p={4} borderRadius="lg" mb={4} border="1px" borderColor="gray.200">
                <Heading as="h3" size="sm" textAlign="center">
                    Find a recipe by selecting a country
                </Heading>
            </Box>
            <Text fontSize="lg" className="compass-country">Country: {country}</Text>
            <HStack spacing={4} mt={5} mb={5}>
                
                <Button colorScheme="teal" variant="solid" onClick={pickRandomCountry} style={{ color: 'white' }}>
                    Get Random Country
                </Button>
                <Button colorScheme="teal" variant="solid" isLoading={fetchingData} onClick={handleGenerateRecipe} style={{ color: 'white' }}>
                    Generate Recipe
                </Button>
                <Tooltip hasArrow label="Save Recipe" placement="top" fontSize="md" isOpen={hoverState}>
                    <IconButton
                        icon={<StarIcon />}
                        colorScheme="purple"
                        variant="outline"
                        isDisabled={fetchingData || !dish.length}
                        onClick={handleSaveRecipe}
                        onMouseEnter={() => setHoverState(true)}
                        onMouseLeave={() => setHoverState(false)}
                    />
                </Tooltip>
            </HStack>
            {fetchingData && <Text className="fetching-recipe">...fetching recipe...</Text>}

            
            <Box>
                <VStack spacing={3} align="center">
                    {dish && (
                        <>
                            <Heading as="h3" size="sm">
                                Your Global Dish Challenge
                            </Heading>
                            <Box p={6} border="2px" borderColor="teal.300" borderRadius="md">
                                <Text fontSize="2xl" color="black.500" fontWeight="bold">
                                    {dish}
                                </Text>
                            </Box>
                        </>
                    )}
                    {description && <Text>{description}</Text>}
                </VStack>
            </Box>

            <Ingredients />
            <Instructions />

            <IconButton
                icon={<ChevronUpIcon />}
                isRound
                size="lg"
                colorScheme="teal"
                position="fixed"
                bottom="20px"
                right="20px"
                onClick={() => scrollToTop()}
            />
        </VStack>
    );
}

