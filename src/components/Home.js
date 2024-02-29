import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { VStack, Button, Text, Box, Heading, Center } from "@chakra-ui/react";

export default function Home () {
    const navigate = useNavigate()
    const { isAuthenticated, loginWithRedirect } = useAuth0()
    // isAuthenticated = true;

    useEffect(() => {
        if(!isAuthenticated) {
            loginWithRedirect();
        }
    }, [isAuthenticated, loginWithRedirect])
    return (
        <Center mt={5}>
        <Box 
            width="auto" 
            maxWidth="90%" 
            bg="gray.100" 
            borderRadius="lg" 
            shadow="md" 
            alignSelf="center" 
            p={15}
            border="2px"
            borderColor="gray.200"
        >
        <VStack spacing={4}>
            <Heading as="h1">
                Welcome to the Culinary Compass
            </Heading>
            <Text>
                This site uses AI to generate recipes
            </Text>
            <Text>
                Click the button below to try new recipes from around the world!
            </Text>
            <Button colorScheme="teal" onClick={() => navigate('/compass')}>Go To Compass</Button>
        </VStack>
        </Box>
        </Center>
    )
}
// thisIsATestPassword1234!