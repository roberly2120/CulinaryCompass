import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { VStack, Heading, Text, Button } from "@chakra-ui/react";

export default function LandingPage() {
  const { loginWithRedirect } = useAuth0();

  return (
    <VStack spacing={4} align="center" justify="center" height="100vh">
      <Heading as="h1" size="2xl" textAlign="center">
        Welcome to Culinary Compass
      </Heading>
      <Text fontSize="lg" textAlign="center">
        Please Log In to continue
      </Text>
      <Button colorScheme="teal" onClick={() => loginWithRedirect()}>
        Log In
      </Button>
    </VStack>
  );
}
