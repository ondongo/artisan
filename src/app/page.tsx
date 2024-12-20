"use client";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import KeyFiguresSection from "@/components/number";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import StormDiv from "@/components/section";
import NavBar from "@/components/NavBar";
export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/demo");
  };
  return (
    <Flex bg="gray.50" minH="100vh" direction={"column"} justifyContent={"center"} alignItems={"center"} pt="30px" overflow={"hidden"}>
      {/* Header */}
      <NavBar />

      {/* Hero Section */}
      <Container maxW="7xl" py={12}>
        <Flex
          direction={{ base: "column", md: "row" }} // Stack en colonne sur petits écrans, en ligne sur grands écrans
          align="center"
          justify="space-between"
        >
          {/* Texte à gauche */}
          <Box
            flex="1"
            textAlign={{ base: "center", md: "left" }}
            mb={{ base: 8, md: 0 }}
          
          >
            <Heading
              lineHeight={1.2}
              fontWeight={700}
              fontSize={{ base: "26px", sm: "30px", md: "46px" }}
              mb={4}
              
            >
              <Text
                as={"span"}
                position={"relative"}
                zIndex={1} 
                _after={{
                  content: "''",
                  width: "100%",
                  height: "30%",
                  position: "absolute",
                  bottom: 1,
                  left: 1,
                  bg: "#DD6A1F",
                  zIndex: -1, // Le pseudo-élément est derrière
                }}
              >
                Obtenez une analyse experte 
              </Text>
              <br />
              <Text as={"span"} color={"#DD6A1F"}>
              de vos devis en quelques clics
              </Text>
            </Heading>

            <Text fontSize="lg" color="gray.600" mb={6}>
              Notre technologie d&apos;intelligence artificielle analyse votre
              devis, le contexte et les images pour vous fournir un avis
              objectif et détaillé.
            </Text>
            <Button colorScheme="orange" size="lg" onClick={handleClick}>
              Analyser mon devis gratuitement
            </Button>
          </Box>

          {/* Image à droite */}
          <Box flex="1" display="flex" justifyContent="center">
            <Image
              src="Calque_1.png"
              alt="Analyse illustration"
              boxSize={{ base: "300px", md: "400px" }}
              objectFit="contain"
            />
          </Box>
        </Flex>
      </Container>

      {/* Features Section */}
      <Box py={8} mt={12}>
        <SimpleGrid
          columns={{ base: 1, md: 4 }}
          spacing={6}
          maxW="7xl"
          mx="auto"
          textAlign="center"
        >
          <FeatureCard title="Analyse complète du devis">
            <Image
              src="/Devis-complet.svg"
              alt="Analyse complète du devis"
              boxSize="80px"
              mx="auto"
              mb={4}
              bg={"#dd6b20"}
              borderRadius={8}
            />
          </FeatureCard>
          <FeatureCard title="Prise en compte des images fournies">
            <Image
              src="/Images-fournies.svg"
              alt="Prise en compte des images fournies"
              boxSize="80px"
              mx="auto"
              mb={4}
              bg={"#dd6b20"}
              borderRadius={8}
            />
          </FeatureCard>
          <FeatureCard title="Avis objectif généré par IA">
            <Image
              src="/IA.svg"
              alt="Avis objectif généré par IA"
              boxSize="80px"
              mx="auto"
              mb={4}
              bg={"#dd6b20"}
              borderRadius={8}
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
              bg={"#dd6b20"}
            />
          </FeatureCard>
        </SimpleGrid>
      </Box>
      <KeyFiguresSection />
      <StormDiv />
      <ScrollToTopButton />
    </Flex>
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
      _hover={{ bg: "orange.200", transform: "scale(1.05)" }}
      transition="0.3s"
      textAlign="center"
    >
      {children}
      <Text fontWeight="bold" fontSize="md" mt={4}>
        {title}
      </Text>
    </Box>
  );
}
