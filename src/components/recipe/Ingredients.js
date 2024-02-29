import React from "react";
import { AppContext } from "../../state/context";
import { Box, Heading, UnorderedList, ListItem } from "@chakra-ui/react";

export default function Ingredients() {
    const { globalState } = React.useContext(AppContext);
    const ingredients = globalState.ingredients;
    if(!ingredients.length){
        return null;
    }
    return (
        <Box p={4} shadow="sm" borderWidth="1px" borderRadius="lg" maxWidth="container.md" w="100%" mx="auto">
            {ingredients.length > 0 && (
                <>
                    <Heading as="h3" size="md" mb={4}>
                        Ingredients
                    </Heading>
                    <UnorderedList spacing={2}>
                        {ingredients.map((ingredient, idx) => (
                            <ListItem key={idx}>{ingredient}</ListItem>
                        ))}
                    </UnorderedList>
                </>
            )}
        </Box>
    );
}
