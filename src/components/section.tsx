import { Box, Button, Image, Text } from "@chakra-ui/react";

const StormDiv = () => {
    return (
        <Box
            bg="#DD6B20"
            w="100%"
            h="450px"
            borderRadius="md"
            overflow="hidden"
            position="relative"
            boxShadow="lg"
        >
            <Image
                src="img.png"
                alt="Analyse illustration"
                boxSize={{ base: "300px", md: "400px" }}
                objectFit="contain"
                ml={60} // Décale l'image un peu plus à droite
            />

            <Text
                position="absolute"

                left="70%" // Décale le texte principal vers la droite
                bottom="45%"
                transform="translate(-50%, -50%)"
                color="white"
                fontSize="5xl"
                fontWeight="bold"
                textAlign="start"
            >
                Analyse de devis en 30 secondes par IA
            </Text>
            <Text
                position="absolute"
                bottom="35%"
                left="67.5%" // Décale le texte secondaire vers la droite
                transform="translate(-50%, -50%)"
                color="white"
                fontSize="xl"
                ml={12} // Décale légèrement le contenu
            >
                Ne laissez plus les devis ralentir vos travaux. Passer à la vitesse supérieure dès aujourd'hui !
            </Text>

            <Button
                bg={"white"}
                position="absolute"
                bottom="20%"
                left="65%" // Décale le bouton vers la droite
                transform="translate(-50%, -50%)"
                colorScheme="orange"
                size="lg"
                onClick={() => console.log("Analyser mon devis gratuitement")}
                borderRadius={10}
                color={"#DD6B20"}
            >
                Démarrer mon essai gratuit
            </Button>
        </Box>
    );
};

export default StormDiv;