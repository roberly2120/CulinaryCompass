import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { readDocument } from "../FireStore/firestoreOperations";
import { Box, VStack, Heading, Text, UnorderedList, ListItem } from "@chakra-ui/react";

export default function SavedRecipe() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            const recipeData = await readDocument('recipes', id);
            setRecipe(recipeData);
            setIsLoading(false);
        };
        fetchRecipe();
    }, [id]);

    if (isLoading) {
        return (
            <Box textAlign="center" mt="5">
                <Text>Loading...</Text>
            </Box>
        );
    }

    return (
        <VStack spacing={4} className="saved-recipe-container" mt={5}>
            <Heading as="h2" size="lg">Dish: {recipe.dish}</Heading>
            <Text fontSize="lg">Country: {recipe.country}</Text>
            <Text fontSize="md">{recipe.description}</Text>

            <Box border="1px" borderColor="gray.200" p={4} borderRadius="md" w="80%">
                <Heading as="h3" size="md">Ingredients</Heading>
                <UnorderedList>
                    {recipe.ingredients.map((ingredient, index) => (
                        <ListItem key={index}>{ingredient}</ListItem>
                    ))}
                </UnorderedList>
            </Box>

            <Box border="1px" borderColor="gray.200" p={4} borderRadius="md" w="80%">
                <Heading as="h3" size="md">Instructions</Heading>
                <UnorderedList>
                    {recipe.instructions.map((step, index) => (
                        <ListItem key={index}>{step}</ListItem>
                    ))}
                </UnorderedList>
            </Box>
        </VStack>
    );
}
