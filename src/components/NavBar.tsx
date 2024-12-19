import { Flex, Box, Button } from "@chakra-ui/react";
import React from "react";

function NavBar() {
  return (
    <Flex
      as="header"
      justify="space-between"
      align="center"
      p={4}
      bg="white"
      boxShadow="sm"
    >
      <Box fontWeight="bold" fontSize="lg" color="orange.500">
        Logos
      </Box>
      <Button colorScheme="orange" variant="solid" size="md">
        Contact
      </Button>
    </Flex>
  );
}

export default NavBar;
