// components/KeyFiguresSection.tsx
import { Box, Text, Flex } from "@chakra-ui/react";

const KeyFiguresSection = () => {
    return (
        <Box bg="gray.50" p={8} textAlign="center">
            <Text fontSize="5xl" fontWeight="bold">
                Nos chiffres clés
            </Text>
            <Text fontSize="2xl" fontWeight="bold" mb={6}>
                Nos chiffres clés démontrent la viabilité et la solidité de notre solution.
            </Text>

            <Flex justify="center" align="center" direction="row" gap={8}>
                {/* Bloc 1 */}
                <Flex direction="column" align="center">
                    <Text fontSize="5xl" fontWeight="extrabold" color="black">
                        92%
                    </Text>
                    <Text fontSize="md" color="gray.600">
                        Taux de satisfaction de nos clients
                    </Text>
                </Flex>

                {/* Bloc 2 */}
                <Flex direction="column" align="center">
                    <Text fontSize="5xl" fontWeight="extrabold" color="black">
                        150+
                    </Text>
                    <Text fontSize="md" color="gray.600">
                        Partenariats conclus
                    </Text>
                </Flex>
            </Flex>
        </Box>
    );
};

export default KeyFiguresSection;