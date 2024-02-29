import React from "react";
import { AppContext } from "../../state/context";
import { Box, Heading, OrderedList, ListItem } from "@chakra-ui/react";

export default function Instructions() {
    const { globalState } = React.useContext(AppContext);
    const instructions = globalState.instructions;

    if (!instructions.length) {
        return null;
    }
    return (
        <Box p={4} shadow="sm" borderWidth="1px" borderRadius="lg" maxWidth="container.md" w="100%" mx="auto">
            {instructions.length > 0 && (
                <>
                    <Heading as="h3" size="md" mb={4}>
                        Instructions
                    </Heading>
                    <OrderedList spacing={2}>
                        {instructions.map((step, idx) => (
                            <ListItem key={idx}>{step}</ListItem>
                        ))}
                    </OrderedList>
                </>
            )}
        </Box>
    );
}
