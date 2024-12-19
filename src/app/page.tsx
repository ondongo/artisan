import { Box, Button, Container, Flex, Heading, Image, SimpleGrid, Text } from '@chakra-ui/react';

export default function Home() {
    // @ts-ignore
    return (
        <Box bg="gray.50" minH="100vh">
            {/* Header */}
            <Flex as="header" justify="space-between" align="center" p={4} bg="white" boxShadow="sm">
                <Box fontWeight="bold" fontSize="lg" color="orange.500">
                    Logo
                </Box>
                <Button colorScheme="orange" variant="solid" size="sm">
                    Contact
                </Button>
            </Flex>

            {/* Hero Section */}
            <Container maxW="6xl" py={12}>
                <Flex
                    direction={{ base: 'column', md: 'row' }} // Stack en colonne sur petits écrans, en ligne sur grands écrans
                    align="center"
                    justify="space-between"
                >
                    {/* Texte à gauche */}
                    <Box flex="1" textAlign={{ base: 'center', md: 'left' }} mb={{ base: 8, md: 0 }}>
                        <Heading as="h1" size="2xl" fontWeight="bold" mb={4}>
                            Obtenez une analyse experte de vos devis en quelques clics
                        </Heading>
                        <Text fontSize="lg" color="gray.600" mb={6}>
                            Notre technologie d'intelligence artificielle analyse votre devis, le contexte et les images
                            pour vous fournir un avis objectif et détaillé.
                        </Text>
                        <Button colorScheme="orange" size="lg">
                            Analyser mon devis gratuitement
                        </Button>
                    </Box>

                    {/* Image à droite */}
                    <Box flex="1" display="flex" justifyContent="center">
                        <Image
                            src="Calque_1.png"
                            alt="Analyse illustration"
                            boxSize={{ base: '300px', md: '400px' }}
                            objectFit="contain"
                        />
                    </Box>
                </Flex>
            </Container>

            {/* Features Section */}
            <Box bg="white" py={8} mt={12}>
                <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6} maxW="6xl" mx="auto" textAlign="center">
                    <FeatureCard title="Analyse complète du devis">
                        <Image
                            src="/Devis-complet.svg"
                            alt="Analyse complète du devis"
                            boxSize="80px"
                            mx="auto"
                            mb={4}
                        />
                    </FeatureCard>
                    <FeatureCard title="Prise en compte des images fournies">
                        <Image
                            src="/Images-fournies.svg"
                            alt="Prise en compte des images fournies"
                            boxSize="80px"
                            mx="auto"
                            mb={4}
                        />
                    </FeatureCard>
                    <FeatureCard title="Avis objectif généré par IA">
                        <Image
                            src="/IA.svg"
                            alt="Avis objectif généré par IA"
                            boxSize="80px"
                            mx="auto"
                            mb={4}
                        />
                    </FeatureCard>
                    <FeatureCard title="Recommandations personnalisées">
                        <Image
                            src="/recommandations-personnalisées.svg"
                            alt="Recommandations personnalisées"
                            boxSize="80px"
                            mx="auto"
                            mb={4}
                            borderRadius={8}
                        />
                    </FeatureCard>
                </SimpleGrid>
            </Box>
        </Box>
    );
}

// FeatureCard Component
interface FeatureCardProps {
    title: string;
    children?: React.ReactNode;
}

function FeatureCard({ title, children }: FeatureCardProps) {
    return (
        <Box
            p={6}
            bg="white"
            borderRadius="md"
            boxShadow="sm"
            _hover={{ bg: 'orange.200', transform: 'scale(1.05)' }}
            transition="0.3s"
            textAlign="center"
        >
            {children}
            <Text fontWeight="bold" fontSize="md"  mt={4}>
                {title}
            </Text>
        </Box>
    );
}