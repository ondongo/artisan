import { DocumentProcessorServiceClient } from "@google-cloud/documentai";
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";
import fetch from "node-fetch";

export const config = {
  api: {
    bodyParser: false, // Disable body parser to handle file upload with formidable
  },
};

const keyFilename = path.join(__dirname, "../../../../../key.json");

const fetchFile = async (url: any) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch file from URL: ${url}`);
  }
  console.log(`Fetched ${res.arrayBuffer}`);
  return res.arrayBuffer(); // Return the content as a buffer
};

const credentials = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN,
};


export async function POST(request: any) {
 
  const documentclient = new DocumentProcessorServiceClient({
    /*  credentials: {
      private_key: process.env.PRIVATE_KEY, // Your private key from the service account
      client_email: process.env.CLIENT_EMAIL, // Your client email from the service account
    }, */

    credentials: {
      type: process.env.TYPE,
      project_id: process.env.PROJECT_ID,
      private_key_id: process.env.PRIVATE_KEY_ID,
      private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
      client_email: process.env.CLIENT_EMAIL,
      client_id: process.env.CLIENT_ID,
      //auth_uri: process.env.AUTH_URI,
      //token_uri: process.env.TOKEN_URI,
      //auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
      //client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
      universe_domain: process.env.UNIVERSE_DOMAIN,
    },
    apiEndpoint: `${process.env.REGION_ID}-documentai.googleapis.com`,
  });

  const files = await request.json();

  const fileData = files?.files?.[0]?.file ?? "aucun"; // Récupère le premier fichier

  const projectId = process.env.PROJECT_ID;
  const location = process.env.REGION_ID;
  const processorId = process.env.PROCESSOR_ID;

  /* const fileUrl =
    "https://storage.googleapis.com/cloud-samples-data/documentai/codelabs/ocr/Winnie_the_Pooh_3_Pages.pdf";
 */
  // Fetch the file from the URL and convert it to a buffer
  //const arrayBuffer = await fetchFile(fileUrl);

  // Convert the buffer to a base64 encoded string
  // const encodedImage = Buffer.from(arrayBuffer).toString("base64");

  //console.log(encodedImage);
  const name = `projects/${projectId}/locations/${location}/processors/${processorId}`;

  //const filepath2 = path.resolve("facture.pdf");

  //const encod = fs.readFileSync(filepath2);
  //const encodedImage = Buffer.from(encod).toString("base64");
  // Créer un document RawDocument à partir du contenu binaire

  const req = {
    name: name,
    rawDocument: {
      content: fileData,
      mimeType: "application/pdf",
    },
  };

  try {
    const [response] = await documentclient.processDocument(req);
    //console.log("Document processed successfully:", response);
    const document = response.document;

    const { text } = document;

    // Fonction pour récupérer des segments de texte
    const getText = (textAnchor: any) => {
      if (!textAnchor.textSegments || textAnchor.textSegments.length === 0) {
        return "";
      }
      const startIndex = textAnchor.textSegments[0].startIndex || 0;
      const endIndex = textAnchor.textSegments[0].endIndex;
      return text.substring(startIndex, endIndex);
    };

    // Collecter tous les paragraphes du document
    let extractedText = ""; // Variable pour collecter le texte

    // Supposons que "document.pages" contient les pages du document
    const [page1] = document.pages;
    const { paragraphs } = page1;

    // Parcours de tous les paragraphes et collecte du texte
    for (const paragraph of paragraphs) {
      const paragraphText = getText(paragraph.layout.textAnchor);
      extractedText += `Texte du paragraphe :\n${paragraphText}\n\n`;
    }

    // Retourner la réponse avec tout le texte extrait
    return NextResponse.json({ status: 200, message: extractedText });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error processing document",
    });
  }

  //} catch (error) {
  /* return NextResponse.json({
      status: 500,
      error: "Erreur lors du traitement du document",
    }); */
  //}
}
