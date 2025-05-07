"use client"
import { Box, Button, Image, Text, Stack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const StormDiv = () => {
    const router = useRouter();
    return (
        <Box
            bg="#DD6B20"
            w="100%"
            h={{ base: "auto", md: "450px" }}
            borderRadius="md"
            overflow="hidden"
            position="relative"
            boxShadow="lg"
            p={{ base: 4, md: 8 }}
        >
            <Stack
                direction={{ base: "column", md: "row" }}
                align="center"
                justify="center"
                spacing={6}
                h="100%"
            >
                <Image
                    src="img.png"
                    alt="Analyse illustration"
                    boxSize={{ base: "250px", md: "350px" }}
                    objectFit="contain"
                />

                <Box textAlign={{ base: "center", md: "left" }} maxW="600px">
                    <Text
                        color="white"
                        fontSize={{ base: "2xl", md: "4xl" }}
                        fontWeight="bold"
                        mb={4}
                    >
                        Analyse de devis en 30 secondes par IA
                    </Text>
                    <Text
                        color="white"
                        fontSize={{ base: "md", md: "lg" }}
                        mb={6}
                    >
                        Ne laissez plus les devis ralentir vos travaux. Passez à la vitesse supérieure dès aujourd&apos;hui !
                    </Text>
                    <Button
                        bg="white"
                        color="#DD6B20"
                        size="lg"
                        onClick={() => router.push("/demo")}
                        borderRadius="md"
                    >
                        Démarrer mon essai gratuit
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
};

export default StormDiv;