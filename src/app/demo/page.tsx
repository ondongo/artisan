"use client";

import NavBar from "@/components/NavBar";
import {
  Button,
  Flex,
  Text,
  Image,
  Box,
  VStack,
  Divider,
  Stack,
  Spinner,
  SkeletonCircle,
  SkeletonText,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [fileData, setFileData] = useState<{
    base64: string | null;
    name: string | null;
    type: string | null;
  }>({
    base64: null,
    name: null,
    type: null,
  });

  const [extractedText, setExtractedText] = useState("");
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileData({
          base64: reader.result?.toString().split(",")[1] || null,
          name: file.name,
          type: file.type,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const [analysis, setAnalysis] = useState("");
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: 5 * 1024 * 1024,
  });

  const handleExtractAndAnalyze = async () => {
    setIsLoading(true);
    try {
      if (!fileData.base64) {
        alert("Veuillez télécharger un fichier.");
        return;
      }

      // Étape 1 : Extraction du texte via DocumentAI
      const extractPayload = {
        files: [
          {
            file: fileData.base64,
            originalFilename: fileData.name,
            mimetype: fileData.type,
          },
        ],
      };

      const extractResponse = await fetch("/api/documentai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(extractPayload),
      });

      const extractData = await extractResponse.json();

      if (extractData.status === 200) {
        const extractedText = extractData.message;
        setExtractedText(extractedText);
        console.log("Texte extrait :", extractedText);

        // Étape 2 : Analyse via OpenAI
        const analyzeResponse = await fetch("/api/openapi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: extractedText }),
        });

        const analyzeData = await analyzeResponse.json();

        if (analyzeData.status === 200) {
          setAnalysis(analyzeData.message);
          setIsAnalyzed(true);
          console.log("Analyse :", analyzeData.message);
        } else {
          console.error("Erreur d'analyse :", analyzeData.error);
        }
      } else {
        console.error("Erreur d'extraction :", extractData.message);
      }
    } catch (error) {
      console.error("Erreur lors du traitement :", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex height={"auto"} direction={"column"} gap={8}>
      <NavBar />

      <Flex
        py={5}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Heading
          lineHeight={1.1}
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
        >
          <Text
            as={"span"}
            position={"relative"}
            _after={{
              content: "''",
              width: "full",
              height: "30%",
              position: "absolute",
              bottom: 1,
              left: 0,
              bg: "#DD6A1F",
              zIndex: -1,
            }}
          >
            Analyser votre devis avec
          </Text>
          <br />
          <Text as={"span"} color={"#DD6A1F"}>
            Notre IA
          </Text>
        </Heading>
      </Flex>

      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Flex
          direction={["column", null, "row"]}
          justifyContent={["center", null, "space-between"]}
          width={["95%", null, "80%"]}
        >
          <Flex direction="column" align="center">
            <div
              {...getRootProps()}
              style={{
                border: "2px dashed #DD6A1F",
                padding: "20px",
                borderRadius: "8px",
                cursor: "pointer",
                width: "100%",
                maxWidth: "500px",
                textAlign: "center",
                minHeight: "400px", // Augmentation de la hauteur
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "16px", // Espace entre les éléments
              }}
            >
              <input {...getInputProps()} />
              <div>
                {/* Icône pour les fichiers/images */}
                <Image
                  src="/fileorange.svg"
                  alt="Icône pour les fichiers"
                  width={16}
                  height={20}
                />
              </div>
              <Text mb={2}>
                Déposez votre devis ici, ou cliquez pour le sélectionner (pdf,
                png, jpeg jusqu&nbsp;à 5MB)
              </Text>
            </div>

            {/* Affichage de l'aperçu ou du nom du fichier sélectionné */}
            {fileData.type?.startsWith("image/") && fileData.base64 ? (
              <Image
                src={`data:image/jpeg;base64,${fileData.base64}`}
                alt="Aperçu du fichier"
                maxWidth="300px"
                mt={4}
                borderRadius="8px"
              />
            ) : fileData.type === "application/pdf" ? (
              <Box mt={4}>
                <Text fontSize="xl" fontWeight="bold">
                  PDF sélectionné : {fileData.name}
                </Text>
                {/* Optionnellement, tu pourrais afficher une icône PDF ici */}
              </Box>
            ) : fileData.name ? (
              <Text mt={4}>Fichier sélectionné : {fileData.name}</Text>
            ) : null}

            <Flex mt={4}>
              <Button
                onClick={handleExtractAndAnalyze}
                colorScheme="orange"
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : "Soumettre le devis pour analyse"}
              </Button>
            </Flex>
          </Flex>

          <Stack
            direction="row"
            p={4}
            h="750px"
            display={["none", null, "block"]}
          >
            <Divider orientation="vertical" />
          </Stack>

          <Flex>
            {isLoading ? (
              <Box width="500px">
                <SkeletonCircle size="10" />
                <SkeletonText
                  mt="4"
                  noOfLines={4}
                  spacing="4"
                  skeletonHeight="2"
                />
              </Box>
            ) : (
              <Box width="500px">
                {isAnalyzed && (
                  <Box my={"2rem"}>
                    <Box mt={4} p={4} borderWidth="1px" borderRadius="8px">
                      <Text>{analysis}</Text>
                    </Box>
                  </Box>
                )}

                {!isAnalyzed && (
                  <VStack align="start" spacing={4}>
                    <Text color={"#DD6A1F"} fontSize="xl" fontWeight="bold">
                      Ce que nous analysons sur vos devis
                    </Text>

                    <Text fontSize="md" fontWeight="bold" color="gray.700">
                      Identité de l&apos;artisan :
                    </Text>
                    <Text color="gray.500">
                      Nom de l&apos;artisan / Entreprise
                    </Text>
                    <Divider borderColor="gray.300" />

                    <Text fontSize="md" fontWeight="bold" color="gray.700">
                      Tarif par rapport aux tendances du marché :
                    </Text>
                    <Text color="gray.500">
                      Le tarif est cohérent avec le marché
                    </Text>
                    <Divider borderColor="gray.300" />

                    <Text fontSize="md" fontWeight="bold" color="gray.700">
                      Vérification de la cohérence du devis :
                    </Text>
                    <Text color="gray.500">Le devis semble cohérent</Text>
                    <Divider borderColor="gray.300" />

                    {/* Ajout de nouvelles vérifications */}
                    <Text fontSize="md" fontWeight="bold" color="gray.700">
                      Respect des normes légales :
                    </Text>
                    <Text color="gray.500">
                      Le devis respecte les normes légales en vigueur
                    </Text>
                    <Divider borderColor="gray.300" />

                    <Text fontSize="md" fontWeight="bold" color="gray.700">
                      Estimation du délai de livraison :
                    </Text>
                    <Text color="gray.500">Le délai estimé est réaliste</Text>
                    <Divider borderColor="gray.300" />

                    <Text fontSize="md" fontWeight="bold" color="gray.700">
                      Garanties et assurances :
                    </Text>
                    <Text color="gray.500">
                      Les garanties sont clairement spécifiées
                    </Text>
                    <Divider borderColor="gray.300" />

                    {/* Pourcentage de fiabilité */}
                    <Text fontSize="md" fontWeight="bold" color="green.700">
                      Fiabilité du devis après analyse :
                    </Text>

                    <Flex direction="column" align="center" p={6}>
                      <Box bg="#DD6A1F" width="100%" borderRadius="8px" p={2}>
                        <Text fontSize="md" fontWeight="600" color="orange.300">
                          85% de fiabilité
                        </Text>
                      </Box>
                      <Text color="gray.500" mt={2}>
                        Le devis présente quelques incohérences mineures. Voici
                        les détails :
                      </Text>
                      <Box mt={4} p={4} borderWidth="1px" borderRadius="8px">
                        <Text>
                          Incohérence : Le prix des matériaux semble trop élevé.
                        </Text>
                        <Text>Omission : Aucune mention des garanties.</Text>
                        <Text>
                          Termes flous : Le délai de livraison n&apos;est pas
                          clairement précisé.
                        </Text>
                      </Box>
                    </Flex>
                  </VStack>
                )}
              </Box>
            )}
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}
