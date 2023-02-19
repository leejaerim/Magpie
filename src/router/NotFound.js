import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
export default function NotFound() {
    return <VStack bg="gray.100" justify={"center"} minH="100vh">
        <Heading>Page not Found</Heading>
        <Text>It semms that you're lost.</Text>
        <Link to="/">
            <Button colorScheme={"twitter"} variant={"solid"}>Go Home &rarr;</Button>
        </Link>
    </VStack>
}