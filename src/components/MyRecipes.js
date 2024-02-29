import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { readUserDocuments, deleteDocument } from "../FireStore/firestoreOperations";
import { useAuth0 } from "@auth0/auth0-react";
import { VStack, Heading, Center, Spacer, Button, Stack, HStack, StackDivider, Card, Box, CardBody, Text, Spinner } from "@chakra-ui/react";

export default function MyRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [pageNotice, setPageNotice] = useState('')
    const { user } = useAuth0();
    const navigate = useNavigate();
    const [hasFetched, setHasFetched] = useState(false);

    useEffect(() => {
        const fetchRecipes = async () => {
            const userRecipes = await readUserDocuments('recipes', user.sub)
            setRecipes(userRecipes);
            setHasFetched(true);

        };
        fetchRecipes();
    }, [user.sub])


    const handleDeleteRecipe = async (id) => {
        await deleteDocument('recipes', id);
        setRecipes(recipes.filter(recipe => recipe.id !== id));
        setPageNotice('Recipe Deleted')
        setTimeout(() => setPageNotice(''), 5000)
    }
    if(!hasFetched){
        return (
            <VStack spacing={4} align="center" justify="center" height="100vh">
                <Spinner size="xl" />
            </VStack>
        )
    }
    else if (!recipes.length) {
        return (
            <VStack spacing={4} align="center" justify="center" height="100vh">
                <Heading as="h1" size="xl" textAlign="center">
                    My Recipes
                </Heading>
                <Text fontSize="lg" textAlign="center">
                    You have not saved any recipes yet!
                </Text>
            </VStack>
        )

    }

    return (
        <VStack className="myrecipes-container" spacing={4} align="center">
            <Heading as="h1" size="xl" fontWeight="semibold" color="gray.700">
                My Recipes
            </Heading>
            <Text className="page-notice" color="gray.500">{pageNotice}</Text>
            {recipes.map((recipe, index) => (
                <Center key={index}>
                    <Card
                        w="300px"
                        h="auto"
                        minWidth="300px"
                        minHeight="200px"
                        mb={5}
                        border="2px"
                        borderColor="gray.300"
                        shadow="lg"
                    >
                        <CardBody>
                            <Stack
                                divider={<StackDivider borderColor="gray.200" borderWidth="2px" />}
                                spacing={3}
                            >
                                <HStack spacing={4}>
                                    <Text fontWeight="bold">{recipe.dish}</Text>
                                    <Box height="1.5rem" width="2px" bgColor="gray.200" alignSelf="center" />
                                    <Spacer />
                                    <Text>{recipe.country}</Text>
                                </HStack>

                                <Text>{recipe.description}</Text>

                                <HStack spacing={4}>
                                    <Button size="md" colorScheme="teal" onClick={() => navigate(`/saved-recipe/${recipe.id}`)}>View Recipe</Button>
                                    <Box ml={5} height="20px" width="2px" bgColor="gray.200" alignSelf="center" />
                                    <Spacer />
                                    <Button size="sm" colorScheme="red" onClick={() => handleDeleteRecipe(recipe.id)}>Delete</Button>
                                </HStack>
                            </Stack>
                        </CardBody>
                    </Card>
                </Center>
            ))}
        </VStack>
    );
}

