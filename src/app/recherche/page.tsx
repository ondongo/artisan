"use client";

import NavBar from "@/components/NavBar";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Text,
  VStack,
  Tag,
  Avatar,
  Image,
  Badge,
} from "@chakra-ui/react";
import { FiMapPin } from "react-icons/fi";
import { FiStar } from "react-icons/fi";
export default function FindArtisan() {
  return (
    <Flex
      bg="gray.50"
      minH="100vh"
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      pt="30px"
      gap={8}
    >
      {/* Header */}
      <NavBar />
      {/* Header Section */}
      <Box textAlign="center">
        <Heading as="h1" fontSize={{ base: "2xl", md: "4xl" }} mb={4}>
          Trouvez l’artisan idéal
        </Heading>
        <Text color="gray.600">
          Notre IA vous aide à trouver les meilleurs artisans selon vos besoins
          spécifiques
        </Text>
      </Box>
      {/* Search Section */}

      <Flex
        direction="column"
        bg="white"
        boxShadow="sm"
        borderRadius="md"
        p={6}
        gap={4}
        width={["95%", null, "70%"]}
      >
        {/* Première ligne : Champ principal et bouton */}
        <Flex
          gap={4}
          alignItems="center"
          direction={{ base: "column", md: "row" }}
        >
          <Input
            placeholder="Décrivez votre projet en détail..."
            flex={1}
            bg="gray.100"
            _placeholder={{ color: "gray.500" }}
            borderRadius="md"
            minH={"40px"}
          />
          <Button
            colorScheme="orange"
            display="flex"
            alignItems="center"
            gap={2}
            px={6}
            justifyContent={"center"}
          >
            <Image src={"/iconstars.svg"} alt="" boxSize={6} />
            Suggestions IA
          </Button>
        </Flex>

        {/* Deuxième ligne : Sélecteurs */}
        <Flex gap={4} flexWrap="wrap" alignItems="center">
          <Select
            placeholder="Types de travaux"
            bg="gray.100"
            flex={1}
            minWidth="200px"
          >
            <option value="plomberie">Plomberie</option>
            <option value="electricite">Électricité</option>
            <option value="chauffage">Chauffage</option>
          </Select>
          <Select
            placeholder="Zone géographique"
            bg="gray.100"
            flex={1}
            minWidth="200px"
          >
            <option value="paris">Paris</option>
            <option value="lyon">Lyon</option>
            <option value="marseille">Marseille</option>
          </Select>
          <Select placeholder="Budget" bg="gray.100" flex={1} minWidth="200px">
            <option value="moins500">Moins de 500€</option>
            <option value="500-1000">500€ - 1000€</option>
            <option value="plus1000">Plus de 1000€</option>
          </Select>
        </Flex>
      </Flex>
      {/* Artisan Cards */}
      <SimpleGrid
        columns={{ base: 1, md: 3 }}
        spacing={6}
        width={["95%", null, "70%"]}
      >
        <Box
          bg="white"
          boxShadow="md"
          borderRadius="lg"
          overflow="hidden"
          _hover={{ boxShadow: "lg" }}
        >
          {/* Image */}
          <Box overflow="hidden" borderRadius="md" m={"12px"}>
            <Image
              src="/plombier_salledebain_rennes 2.png"
              alt="Artisan"
              objectFit="cover"
              height="250px"
              width="100%" // S'assure que l'image remplit le conteneur
            />
          </Box>
          {/* Content */}
          <Box p={4}>
            {/* Name and Location */}
            <VStack spacing={1} align="start">
              <Flex
                justifyContent={"space-between"}
                alignItems={"center"}
                w={"100%"}
              >
                <Text fontWeight="bold" fontSize="lg" color="gray.800">
                  Martin Dupont
                </Text>
                <Flex alignItems={"center"} color="gray.500" fontSize="sm">
                  <FiMapPin />
                  <Text ml={1}>Paris 15ème</Text>
                </Flex>
              </Flex>
              <Text color="gray.500" fontSize="sm">
                Plombier - Chauffagiste
              </Text>
            </VStack>

            {/* Badges */}
            <Flex justifyContent="start" mt={4} gap={2}>
              <Badge
                bg="#FAE9DF"
                color="#D97706"
                px={3}
                py={1}
                borderRadius="full"
              >
                RGE
              </Badge>
              <Badge
                bg="#FAE9DF"
                color="#D97706"
                px={3}
                py={1}
                borderRadius="full"
              >
                Qualibat
              </Badge>
            </Flex>

            {/* CTA */}
            <Button
              mt={6}
              colorScheme="orange"
              variant="solid"
              width="full"
              borderRadius="md"
            >
              Voir plus
            </Button>
          </Box>
        </Box>

        <Box
          bg="white"
          boxShadow="md"
          borderRadius="lg"
          overflow="hidden"
          _hover={{ boxShadow: "lg" }}
        >
          {/* Image */}
          <Box overflow="hidden" borderRadius="md" m={"12px"}>
            <Image
              src="/plombier_salledebain_rennes 2.png"
              alt="Artisan"
              objectFit="cover"
              height="250px"
              width="100%" // S'assure que l'image remplit le conteneur
            />
          </Box>
          {/* Content */}
          <Box p={4}>
            {/* Name and Location */}
            <VStack spacing={1} align="start">
              <Flex
                justifyContent={"space-between"}
                alignItems={"center"}
                w={"100%"}
              >
                <Text fontWeight="bold" fontSize="lg" color="gray.800">
                Sophie Laurent
                </Text>
                <Flex alignItems={"center"} color="gray.500" fontSize="sm">
                  <FiMapPin />
                  <Text ml={1}>Paris 15ème</Text>
                </Flex>
              </Flex>
              <Text color="gray.500" fontSize="sm">
                Plombier - Chauffagiste
              </Text>
            </VStack>

            {/* Badges */}
            <Flex justifyContent="start" mt={4} gap={2}>
              <Badge
                bg="#FAE9DF"
                color="#D97706"
                px={3}
                py={1}
                borderRadius="full"
              >
                RGE
              </Badge>
              <Badge
                bg="#FAE9DF"
                color="#D97706"
                px={3}
                py={1}
                borderRadius="full"
              >
                Qualibat
              </Badge>
            </Flex>

            {/* CTA */}
            <Button
              mt={6}
              colorScheme="orange"
              variant="solid"
              width="full"
              borderRadius="md"
            >
              Voir plus
            </Button>
          </Box>
        </Box>

        <Box
          bg="white"
          boxShadow="md"
          borderRadius="lg"
          overflow="hidden"
          _hover={{ boxShadow: "lg" }}
        >
          {/* Image */}
          <Box overflow="hidden" borderRadius="md" m={"12px"}>
            <Image
              src="/éléctricienne.png"
              alt="Artisan"
              objectFit="cover"
              height="250px"
              width="100%" // S'assure que l'image remplit le conteneur
            />
          </Box>
          {/* Content */}
          <Box p={4}>
            {/* Name and Location */}
            <VStack spacing={1} align="start">
              <Flex
                justifyContent={"space-between"}
                alignItems={"center"}
                w={"100%"}
              >
                <Text fontWeight="bold" fontSize="lg" color="gray.800">
                Sophie Laurent
                </Text>
                <Flex alignItems={"center"} color="gray.500" fontSize="sm">
                  <FiMapPin />
                  <Text ml={1}>Paris 11ème</Text>
                </Flex>
              </Flex>
              <Text color="gray.500" fontSize="sm">
                Plombier - Chauffagiste
              </Text>
            </VStack>

            {/* Badges */}
            <Flex justifyContent="start" mt={4} gap={2}>
              <Badge
                bg="#FAE9DF"
                color="#D97706"
                px={3}
                py={1}
                borderRadius="full"
              >
                RGE
              </Badge>
              <Badge
                bg="#FAE9DF"
                color="#D97706"
                px={3}
                py={1}
                borderRadius="full"
              >
                Qualibat
              </Badge>
            </Flex>

            {/* CTA */}
            <Button
              mt={6}
              colorScheme="orange"
              variant="solid"
              width="full"
              borderRadius="md"
            >
              Voir plus
            </Button>
          </Box>
        </Box>
        <Box
          bg="white"
          boxShadow="md"
          borderRadius="lg"
          overflow="hidden"
          _hover={{ boxShadow: "lg" }}
        >
          {/* Image */}
          <Box overflow="hidden" borderRadius="md" m={"12px"}>
            <Image
              src="/Rénovation_générale.png"
              alt="Artisan"
              objectFit="cover"
              height="250px"
              width="100%" // S'assure que l'image remplit le conteneur
            />
          </Box>
          {/* Content */}
          <Box p={4}>
            {/* Name and Location */}
            <VStack spacing={1} align="start">
              <Flex
                justifyContent={"space-between"}
                alignItems={"center"}
                w={"100%"}
              >
                <Text fontWeight="bold" fontSize="lg" color="gray.800">
                  Martin Dupont
                </Text>
                <Flex alignItems={"center"} color="gray.500" fontSize="sm">
                  <FiMapPin />
                  <Text ml={1}>Paris 15ème</Text>
                </Flex>
              </Flex>
              <Text color="gray.500" fontSize="sm">
                Plombier - Chauffagiste
              </Text>
            </VStack>

            {/* Badges */}
            <Flex justifyContent="start" mt={4} gap={2}>
              <Badge
                bg="#FAE9DF"
                color="#D97706"
                px={3}
                py={1}
                borderRadius="full"
              >
                RGE
              </Badge>
              <Badge
                bg="#FAE9DF"
                color="#D97706"
                px={3}
                py={1}
                borderRadius="full"
              >
                Qualibat
              </Badge>
            </Flex>

            {/* CTA */}
            <Button
              mt={6}
              colorScheme="orange"
              variant="solid"
              width="full"
              borderRadius="md"
            >
              Voir plus
            </Button>
          </Box>
        </Box>
      </SimpleGrid>
    </Flex>
  );
}
