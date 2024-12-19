import { DocumentProcessorServiceClient } from '@google-cloud/documentai';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();
  const { imageBase64 } = body;

  if (!imageBase64) {
    return NextResponse.json({
      success: false,
      message: 'Aucun fichier fourni.',
    });
  }

  try {
    const client = new DocumentProcessorServiceClient({
      apiEndpoint: 'https://eu-documentai.googleapis.com/v1/projects/202021079520/locations/eu/processors/ef17523f0529d4b2:process',
    });

    const name = `projects/ace-rider-406516/locations/eu/processors/ef17523f0529d4b2`;

    const request = {
      name,
      rawDocument: {
        content: imageBase64,
        mimeType: 'application/pdf', // Change si c'est une image : 'image/jpeg' ou 'image/png'
      },
    };

    const [result] = await client.processDocument(request);
    const extractedText = result.document?.text || 'Aucun texte détecté.';

    return NextResponse.json({ success: true, extractedText });
  } catch (error) {
    console.error('Erreur d\'analyse avec Document AI:', error);
    return NextResponse.json({
      success: false,
      message: 'Erreur d\'analyse avec Document AI.',
    });
    }
}
