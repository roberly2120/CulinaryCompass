import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { readUserDocuments, deleteDocument } from "../FireStore/firestoreOperations";
import { useAuth0 } from "@auth0/auth0-react";
import { VStack, Heading, Stack, Center, Spacer, Button, HStack, StackDivider, Card, Box, Flex, CardBody, Text, Spinner, SimpleGrid, useMediaQuery} from "@chakra-ui/react";

export default function MyRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [pageNotice, setPageNotice] = useState('')
    const { user } = useAuth0();
    const navigate = useNavigate();
    const [hasFetched, setHasFetched] = useState(false);
    
    const [isLargerThan627, isLargerThan932, isLargerThan1230] = useMediaQuery([
        "(min-width: 627px)",
        "(min-width: 932px)",
        "(min-width: 1230px)",
    ])
    let columns;
    if (isLargerThan1230) {
        columns = 4;
    } else if (isLargerThan932) {
        columns = 3;
    } else if (isLargerThan627) {
        columns = 2;
    } else {
        columns = 1;
    }


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
    if (!hasFetched) {
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
            <SimpleGrid columns={columns} spacing={4}>
                {recipes.map((recipe, index) => (

                    <Center key={index}>
                        <Card
                            w={{ base: "90%", sm: "300px" }}
                            h={{ base: "auto", sm: "350px" }}
                            minWidth="300px"
                            minHeight="200px"
                            mb={5}
                            border="2px"
                            borderColor="gray.300"
                            shadow="lg"
                        >

                            <CardBody>

                                <Stack
                                    height="100%"
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


                                    <Flex flexDirection="column" justifyContent="flex-end" height="100%">
                                        <Button size="md" colorScheme="teal" onClick={() => navigate(`/saved-recipe/${recipe.id}`)}>View Recipe</Button>
                                        {/* <Box ml={5} height="20px" width="2px" bgColor="gray.200" alignSelf="center" /> */}
                                        {/* <Spacer /> */}
                                        <Button size="sm" colorScheme="red" mt={3} onClick={() => handleDeleteRecipe(recipe.id)}>Delete</Button>
                                    </Flex>
                                </Stack>

                            </CardBody>

                        </Card>
                    </Center>

                ))}
            </SimpleGrid>
        </VStack>
    );
}

