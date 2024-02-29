import React from "react";
import { Box, VStack, Heading, Text, Center } from "@chakra-ui/react";
export default function About () {
    return (
        <>
            <Center>
                <VStack spacing={4} align="center" justify="start" height="100vh" mt={5}>
                    <Heading as="h1" size="xl" textAlign="center">
                        This App is Silly!
                    </Heading>
                    <Text fontSize="lg" textAlign="center">
                        That's actually the point. It's a fun way to learn new recipes from around the world. 
                    </Text>
                    <Text fontSize="lg">
                        So just try it out
                    </Text>
                    <Text fontSize="md">
                        Come on
                    </Text>
                    <Text fontSize="sm">
                        You know you want to   
                    </Text>
                </VStack>
            </Center>
        </>
    )
}