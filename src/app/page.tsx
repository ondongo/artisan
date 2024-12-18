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
} from "@chakra-ui/react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function Home() {
  const [fileData, setFileData] = useState<{
    base64: string | null;
    name: string | null;
    type: string | null;
  }>({
    base64: null,
    name: null,
    type: null,
  });

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

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: 5 * 1024 * 1024,
  });

  const handleSubmit = async () => {
    if (!fileData.base64) {
      alert("Veuillez télécharger un fichier.");
      return;
    }

    console.log("filedata", fileData.base64);

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageBase64: fileData.base64,
      }),
    });

    const data = await res.json();

    console.log("data", data);
  };

  return (
    <Flex
      height={"auto"}
      justifyContent={"center"}
      alignItems={"center"}
      pt={10}
    >
      <Flex direction={"row"} justifyContent={"space-between"} width={"70%"}>
        <Flex direction="column" align="center">
          <div
            {...getRootProps()}
            style={{
              border: "2px dashed #319795",
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
            <Button onClick={handleSubmit} colorScheme="teal">
              Soumettre le devis pour analyse
            </Button>
          </Flex>
        </Flex>

        <Stack direction="row" h="750px" p={4}>
          <Divider orientation="vertical" />
        </Stack>

        <Flex>
          <Box width="auto">
            <VStack align="start" spacing={4}>
              <Text fontSize="lg" fontWeight="bold" color="gray.700">
                Identité de l&apos;artisan :
              </Text>
              <Text color="gray.500">Nom de l&apos;artisan / Entreprise</Text>
              <Divider borderColor="gray.300" />

              <Text fontSize="lg" fontWeight="bold" color="gray.700">
                Tarif par rapport aux tendances du marché :
              </Text>
              <Text color="gray.500">Le tarif est cohérent avec le marché</Text>
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
                <Box bg="green.200" width="100%" borderRadius="8px" p={2}>
                  <Text fontSize="lg" fontWeight="600" color="green.700">
                    85% de fiabilité
                  </Text>
                </Box>
                <Text color="gray.500" mt={2}>
                  Le devis présente quelques incohérences mineures. Voici les
                  détails :
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
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
