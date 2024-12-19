// components/KeyFiguresSection.tsx
import { Box, Text, Flex } from "@chakra-ui/react";

const KeyFiguresSection = () => {
    return (
        <Box bg="gray.50" p={8} textAlign="center" mb={8} mt={8}>
            <Text fontSize="5xl" fontWeight="bold">
                Nos chiffres clés
            </Text>
            <Text fontSize="2xl" fontWeight="bold" mb={6}>
                Vérifiez votre devis : évitez l&apos;arnaque !
            </Text>

            <Flex justify="center" align="center" direction="row" gap={8}>
                {/* Bloc 1 */}
                <Flex direction="column" align="center">
                    <Text fontSize="5xl" fontWeight="extrabold" color="black">
                        50%
                    </Text>
                    <Text fontSize="md" color="gray.600">
                        Ont déjà eu un roblème avec un devis
                    </Text>

                </Flex>

                {/* Bloc 2 */}
                <Flex direction="column" align="center">
                    <Text fontSize="5xl" fontWeight="extrabold" color="black">
                        40%
                    </Text>
                    <Text fontSize="md" color="gray.600">
                        Afirment manquer de connaisances sur le sujet
                    </Text>
                </Flex>

                <Flex direction="column" align="center">
                    <Text fontSize="5xl" fontWeight="extrabold" color="black">
                        15000
                    </Text>
                    <Text fontSize="md" color="gray.600">
                        Particuliers en 2023 ont eu affaire à une arnaque
                    </Text>
            </Flex>
            </Flex>
        </Box>
    );
};

export default KeyFiguresSection;