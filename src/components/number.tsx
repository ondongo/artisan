// components/KeyFiguresSection.tsx
import { Box, Text, Flex } from "@chakra-ui/react";

const KeyFiguresSection = () => {
  return (
    <Box bg="gray.50" p={8} textAlign="center" mb={8} mt={8}>
      <Text fontSize={["2xl", null, "4xl"]} fontWeight="bold" mb={10}>
        Vérifiez votre devis : évitez l&apos;arnaque !
      </Text>

      <Flex
        justify={["start ", null, "center"]}
        align={["start ", null, "center"]}
        gap={10}
        direction={{ base: "column", md: "row" }}
      >
        {/* Bloc 1 */}

        <Flex direction="row" align={["start ", null, "center"]} padding="4">
          <Box
            width="8px"
            bg="#DD6A1F"
            height="100px"
            borderRadius="md"
            mr="4"
          />

          <Flex direction="column" justifyContent="start" alignItems={"start"}>
            <Text fontSize="4xl" fontWeight="extrabold" color="black">
              50%
            </Text>
            <Text fontSize="16px" color="#2D2D2D">
              Ont déjà eu un roblème avec un devis
            </Text>
          </Flex>
        </Flex>

        {/* Bloc 2 */}
        <Flex direction="row" align={["start ", null, "center"]} padding="4" textAlign="start">
          <Box
            width="8px"
            bg="#DD6A1F"
            height="100px"
            borderRadius="md"
            mr="4"
          />
          <Flex direction="column" justifyContent="start" alignItems={"start"}>
            <Text fontSize="4xl" fontWeight="extrabold" color="black">
              40%
            </Text>
            <Text fontSize="16px" color="#2D2D2D" textAlign="start">
              Afirment manquer de connaisances sur le sujet
            </Text>
          </Flex>
        </Flex>

        <Flex direction="row" align={["start ", null, "center"]} padding="4">
          <Box
            width="8px"
            bg="#DD6A1F"
            height="100px"
            borderRadius="md"
            mr="4"
          />
          <Flex direction="column" justifyContent="start" alignItems={"start"}>
            <Text fontSize="4xl" fontWeight="extrabold" color="black">
              15000
            </Text>
            <Text fontSize="16px" color="#2D2D2D" textAlign="start">
              Particuliers en 2023 ont eu affaire à une arnaque
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default KeyFiguresSection;
