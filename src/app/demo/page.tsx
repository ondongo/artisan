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
import { MdDelete } from "react-icons/md";
import { FiCheckCircle, FiAlertCircle, FiInfo } from "react-icons/fi";
import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Home() {
  const resultsRef = useRef<HTMLDivElement>(null);
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

  const [analysis, setAnalysis] = useState<{
    reliability: number | null;
    details: Record<string, string>;
    conclusion: string;
  }>({
    reliability: null,
    details: {}, // Objet avec des clés et des chaînes de caractères
    conclusion: "",
  });

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
          setAnalysis({
            reliability: analyzeData.reliability,
            details: analyzeData.details,
            conclusion: analyzeData.conclusion,
          });
          setIsAnalyzed(true);
          console.log("Analyse réussie :", analyzeData);
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

  const handleShareResults = async () => {
    const content = `
  Fiabilité globale : ${analysis.reliability || "N/A"}%
  
  Détails de l'analyse :
  ${Object.entries(analysis.details)
    .map(([key, value]) => `- ${key} : ${value}`)
    .join("\n")}
  
  Conclusion :
  ${analysis.conclusion}
    `;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Résultats de l'analyse",
          text: content,
        });
      } catch (error) {
        console.log("Partage annulé ou non pris en charge :", error);
      }
    } else {
      alert(
        "Le partage n'est pas pris en charge sur votre navigateur. Copiez manuellement le contenu."
      );
    }
  };

  const handleDownloadSectionAsPDF = async () => {
    if (!resultsRef.current) return;

    // Capturer la section comme une image avec html2canvas
    const canvas = await html2canvas(resultsRef.current, {
      scale: 2, // Améliorer la qualité
    });

    // Convertir le canvas en image
    const imgData = canvas.toDataURL("image/png");

    // Créer un document PDF avec jsPDF
    const pdf = new jsPDF("p", "mm", "a4"); // Portrait, millimètres, A4
    const imgWidth = 190; // Largeur de l'image en mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width; // Hauteur proportionnelle

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);

    // Télécharger le PDF
    pdf.save("resultats-analyse.pdf");
  };

  return (
    <Flex
      height={"auto"}
      direction={"column"}
      gap={8}
      justifyContent={"center"}
      alignItems={"center"}
      py="30px"
      bg={"#F7FAFC"}
    >
      <NavBar />

      <Flex display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Box textAlign="center">
          <Heading as="h1" fontSize={{ base: "2xl", md: "4xl" }} mb={4}>
            Analyse de devis
          </Heading>
          <Text color="gray.600">
            Faites analyser votre devis par notre IA et obtenez une évaluation
            détaillée
          </Text>
        </Box>
      </Flex>

      <Flex
        direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
        gap={8}
        width={"100%"}
        px={[4, null, 9]}
      >
        {/* Section de téléversement */}

        <Box
          flex={1}
          bg="white"
          borderRadius="md"
          p={[2, null, 8]}
          boxShadow="sm"
          minH={"420px"}
        >
          <Tabs variant="enclosed" colorScheme="orange">
            <Flex
              direction={{ base: "column", md: "row" }}
              gap={4}
              justifyContent="space-between"
              alignItems={"center"}
            >
              <Text fontSize="xl" fontWeight="bold" textAlign={"center"}>
                Téléchargez votre devis
              </Text>
              <TabList
                bg="#F5F5F5"
                p={2}
                borderRadius="md"
                w={"250px"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Tab
                  _selected={{
                    bg: "#FFFFFF",
                    color: "#DD6A1F",
                    fontWeight: "bold",
                    borderRadius: "md",
                  }}
                  flex={1}
                >
                  Gratuit
                </Tab>
                <Tab
                  _selected={{
                    bg: "#FFFFFF",
                    color: "#DD6A1F",
                    fontWeight: "bold",
                    borderRadius: "md",
                  }}
                  flex={1}
                >
                  Premium
                </Tab>
              </TabList>
            </Flex>

            <TabPanels>
              <TabPanel
                display="flex"
                flexDirection="column"
                height={"100%"}
                width={"100%"}
              >
                {!fileData.base64 ? (
                  <Box
                    {...getRootProps()}
                    border="2px dashed #DD6A1F"
                    bg="#FFF9F4"
                    borderRadius="md"
                    padding={8}
                    textAlign="center"
                    minHeight="300px"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    cursor="pointer"
                    transition="0.3s"
                    _hover={{ bg: "#FFEDE0" }}
                  >
                    <input {...getInputProps()} />
                    <Image
                      src="/iconeUpload.png"
                      alt="Icône pour les fichiers"
                      boxSize="90px"
                      mb={4}
                    />
                    <Text color="gray.600">
                      Glissez votre devis ici ou{" "}
                      <Text as="span" color="#DD6A1F" fontWeight="bold">
                        choisissez un fichier
                      </Text>
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      Formats acceptés : PDF, JPG, PNG
                    </Text>
                  </Box>
                ) : (
                  <Box
                    mt={[2, null, 4]}
                    p={[2, null, 4]}
                    border="1px solid #E2E8F0"
                    borderRadius="md"
                  >
                    {/* Affichage des fichiers */}
                    {/* Aperçu du fichier */}
                    {fileData.base64 && (
                      <Box
                        mt={[2, null, 4]}
                        p={[2, null, 4]}
                        border="1px solid #E2E8F0"
                        borderRadius="md"
                      >
                        {fileData.type?.startsWith("image/") ? (
                          <Image
                            src={`data:${fileData.type};base64,${fileData.base64}`}
                            alt="Aperçu de l'image"
                            maxWidth="300px"
                            borderRadius="md"
                            mb={[2, null, 4]}
                          />
                        ) : fileData.type === "application/pdf" ? (
                          <iframe
                            src={`data:application/pdf;base64,${fileData.base64}`}
                            title="Aperçu PDF"
                            width="100%"
                            height="400px"
                          />
                        ) : null}

                        {/* Bouton de suppression */}
                        <Flex
                          justifyContent="space-between"
                          alignItems="center"
                          mt={4}
                          direction={{ base: "column", md: "row" }}
                          gap={4}
                        >
                          <Text fontSize="md" fontWeight="bold">
                            {fileData.name}
                          </Text>
                          <Button
                            onClick={() =>
                              setFileData({
                                base64: null,
                                name: null,
                                type: null,
                              })
                            }
                            colorScheme="red"
                            size="sm"
                            leftIcon={<MdDelete />}
                          >
                            Supprimer
                          </Button>
                        </Flex>
                      </Box>
                    )}
                  </Box>
                )}
                <Flex justifyContent="flex-end" mt="10">
                  <Button
                    onClick={handleExtractAndAnalyze}
                    colorScheme="orange"
                    size="md"
                    isLoading={isLoading}
                  >
                    Lancer l’analyse
                  </Button>
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>

        {/* Section des résultats */}
        <Box
          ref={resultsRef}
          flex={1}
          bg="white"
          borderRadius="md"
          p={8}
          boxShadow="sm"
          minH={"420px"}
        >
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Text fontSize="xl" fontWeight="bold">
              Résultats de l’analyse
            </Text>

            {isLoading && (
              <Flex alignItems="center" gap={2}>
                {/* Cercle animé */}
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="orange.500"
                  size="sm"
                />
                {/* Texte */}
                <Text fontSize="sm" color="gray.500">
                  Analyse en cours...
                </Text>
              </Flex>
            )}
          </Flex>
          <Text fontSize="sm" color="gray.500">
            Les résultats de votre analyse apparaîtront ici une fois le devis
            analysé.
          </Text>

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
              <>
                {isAnalyzed && analysis && (
                  <Box
                    mt={8}
                    p={6}
                    bg="white"
                    borderRadius="md"
                    boxShadow="sm"
                    width="100%"
                  >
                    {/* Fiabilité globale */}
                    <Flex
                      justifyContent="space-between"
                      alignItems="center"
                      mb={6}
                    >
                      <Text fontSize="xl" fontWeight="bold">
                        Résultats de l’analyse
                      </Text>
                      <Box
                        px={3}
                        py={1}
                        bg="green.100"
                        borderRadius="md"
                        color="green.700"
                        fontWeight="bold"
                        fontSize="sm"
                        ml="auto"
                      >
                        Confiance : {analysis.reliability || "N/A"}%
                      </Box>
                    </Flex>

                    {/* Détails des critères */}
                    <VStack spacing={4} align="stretch">
                      {Object.entries(analysis.details).map(([key, value]) => (
                        <Flex
                          key={key}
                          alignItems="center"
                          gap={4}
                          boxShadow="md" // Ombre légère
                          bg="white" // Fond légèrement coloré
                          p={4} // Padding interne
                          borderRadius="md" // Coins arrondis
                        >
                          {/* Barre latérale */}
                          <Box
                            width="6px"
                            height="80px"
                            bg={
                              typeof value === "string" && value.includes("Non")
                                ? "red.500"
                                : "green.500"
                            }
                            borderRadius="md"
                          />
                          {/* Contenu avec icône et texte */}
                          <Flex alignItems="center" gap={4}>
                            {/* Icône dynamique */}
                            <Box
                              minWidth="32px"
                              minHeight="32px"
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                              bg={
                                typeof value === "string" &&
                                value.includes("Non")
                                  ? "red.100"
                                  : "green.100"
                              }
                              borderRadius="full"
                            >
                              {typeof value === "string" &&
                              value.includes("Non") ? (
                                <FiAlertCircle size={20} color="red.500" />
                              ) : (
                                <FiCheckCircle size={20} color="green.500" />
                              )}
                            </Box>

                            {/* Texte des détails */}
                            <Box>
                              <Text fontSize="md" fontWeight="bold">
                                {key}
                              </Text>
                              <Text fontSize="sm" color="gray.600">
                                {value}
                              </Text>
                            </Box>
                          </Flex>
                        </Flex>
                      ))}
                    </VStack>

                    {/* Conclusion */}
                    <Box mt={6}>
                      <Text fontSize="md" fontWeight="bold" color="gray.700">
                        Conclusion :
                      </Text>
                      <Text color="gray.600">{analysis.conclusion}</Text>
                    </Box>

                    {/* Actions */}
                    <Flex mt={8} justifyContent="space-between">
                      <Button
                        colorScheme="orange"
                        size="md"
                        onClick={handleDownloadSectionAsPDF}
                      >
                        Télécharger le rapport
                      </Button>
                      <Button
                        variant="outline"
                        colorScheme="orange"
                        size="md"
                        onClick={handleShareResults}
                      >
                        Partager l’analyse
                      </Button>
                    </Flex>
                  </Box>
                )}
              </>
            )}
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}
