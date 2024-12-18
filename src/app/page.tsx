"use client";

import { Button, Flex, Text, Image, Box } from "@chakra-ui/react";
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
        imageBase64: fileData.base64 
      }),
 
    });

    const data = await res.json();

    console.log("data", data);
  };

  return (
    <Flex height={"100vh"} justifyContent={"center"} alignItems={"center"}>
      <Flex direction="column" align="center" width="100%">
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
            Déposez votre devis ici, ou cliquez pour le sélectionner (pdf, png,
            jpeg jusqu&nbsp;à 5MB)
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
    </Flex>
  );
}
