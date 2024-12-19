"use client";

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
  const [isExtracted, setIsExtracted] = useState(false);
  const [extractedText, setExtractedText] = useState("");
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

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (!fileData.base64) {
        alert("Veuillez télécharger un fichier.");
        return;
      }

      console.log("filedata", fileData.base64);
      const payload = {
        files: [
          {
            file: fileData.base64,
            originalFilename: fileData.name,
            mimetype: fileData.type,
          },
        ],
      };

      const res: any = await fetch("/api/documentai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.status === 200) {
        // Extrait le texte du document
        const extractedText = data.message;
        console.log("Texte extrait:", extractedText);
        setExtractedText(extractedText);
        setIsExtracted(true);
        return extractedText; // Retourne le texte extrait
      } else {
        console.log("Erreur:", data.message);
        setIsExtracted(false);
        return null;
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Erreur :", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyze = async () => {
    setIsLoading(true);
    try {
      if (!extractedText) {
        alert("Aucun texte extrait pour analyse.");
        return;
      }

      const response = await fetch("/api/openapi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: extractedText }),
      });

      const data = await response.json();
      console.log(data.message);
      if (data.status === 200) {
        setAnalysis(data.message);
      } else {
        console.error("Erreur d'analyse :", data.error);
      }
    } catch (error) {
      console.error("Erreur lors de l'appel à l'API :", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex height={"auto"} direction={"column"} gap={8}>
      <Tabs variant="soft-rounded" colorScheme="orange">
        <TabList
          py={10}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Tab>Analyser votre devis avec notre IA</Tab>
          <Tab>Obtenez l&apos;aide d&apos;un expert</Tab>
        </TabList>
        <TabPanels>
          <TabPanel
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Flex
              direction={"row"}
              justifyContent={"space-between"}
              width={"80%"}
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
                    maxWidth: "400px",
                    textAlign: "center",
                  }}
                >
                  <input {...getInputProps()} />
                  <Text mb={2}>
                    Déposez votre devis ici, ou cliquez pour le sélectionner
                    (pdf, png, jpeg jusqu&nbsp;à 5MB)
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
                    onClick={handleSubmit}
                    colorScheme="orange"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Spinner />
                    ) : (
                      "Soumettre le devis pour analyse"
                    )}
                  </Button>
                </Flex>

                <Box mt={6}>
                  <Text>Resultat Analyse IA :</Text>
                  <Box borderWidth="1px" p={4} mt={2} borderRadius="lg">
                    <Text>{analysis}</Text>
                  </Box>
                </Box>
              </Flex>

              <Stack direction="row" h="750px" p={4}>
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
                    {isExtracted && (
                      <Box my={"2rem"}>
                        <Button
                          my={4}
                          colorScheme="blue"
                          onClick={handleAnalyze}
                          isLoading={isLoading}
                        >
                          Analyser extraction avec IA
                        </Button>
                        <Text color="gray.500" mt={2}>
                          Le texte extrait pour analyse à l&apos;IA
                        </Text>

                        <Box mt={4} p={4} borderWidth="1px" borderRadius="8px">
                          <Text>{extractedText}</Text>
                        </Box>
                      </Box>
                    )}

                    <VStack align="start" spacing={4}>
                      <Text fontSize="lg" fontWeight="bold" color="gray.700">
                        Identité de l&apos;artisan :
                      </Text>
                      <Text color="gray.500">
                        Nom de l&apos;artisan / Entreprise
                      </Text>
                      <Divider borderColor="gray.300" />

                      <Text fontSize="lg" fontWeight="bold" color="gray.700">
                        Tarif par rapport aux tendances du marché :
                      </Text>
                      <Text color="gray.500">
                        Le tarif est cohérent avec le marché
                      </Text>
                      <Divider borderColor="gray.300" />

                      <Text fontSize="lg" fontWeight="bold" color="gray.700">
                        Vérification de la cohérence du devis :
                      </Text>
                      <Text color="gray.500">Le devis semble cohérent</Text>
                      <Divider borderColor="gray.300" />

                      {/* Ajout de nouvelles vérifications */}
                      <Text fontSize="lg" fontWeight="bold" color="gray.700">
                        Respect des normes légales :
                      </Text>
                      <Text color="gray.500">
                        Le devis respecte les normes légales en vigueur
                      </Text>
                      <Divider borderColor="gray.300" />

                      <Text fontSize="lg" fontWeight="bold" color="gray.700">
                        Estimation du délai de livraison :
                      </Text>
                      <Text color="gray.500">Le délai estimé est réaliste</Text>
                      <Divider borderColor="gray.300" />

                      <Text fontSize="lg" fontWeight="bold" color="gray.700">
                        Garanties et assurances :
                      </Text>
                      <Text color="gray.500">
                        Les garanties sont clairement spécifiées
                      </Text>
                      <Divider borderColor="gray.300" />

                      {/* Pourcentage de fiabilité */}
                      <Text fontSize="lg" fontWeight="bold" color="green.700">
                        Fiabilité du devis après analyse :
                      </Text>

                      <Flex direction="column" align="center" p={6}>
                        <Box bg="#DD6A1F" width="100%" borderRadius="8px" p={2}>
                          <Text
                            fontSize="lg"
                            fontWeight="600"
                            color="orange.300"
                          >
                            85% de fiabilité
                          </Text>
                        </Box>
                        <Text color="gray.500" mt={2}>
                          Le devis présente quelques incohérences mineures.
                          Voici les détails :
                        </Text>
                        <Box mt={4} p={4} borderWidth="1px" borderRadius="8px">
                          <Text>
                            Incohérence : Le prix des matériaux semble trop
                            élevé.
                          </Text>
                          <Text>Omission : Aucune mention des garanties.</Text>
                          <Text>
                            Termes flous : Le délai de livraison n&apos;est pas
                            clairement précisé.
                          </Text>
                        </Box>
                      </Flex>
                    </VStack>
                  </Box>
                )}
              </Flex>
            </Flex>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
