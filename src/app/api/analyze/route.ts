import { ImageAnnotatorClient } from "@google-cloud/vision";

export async function POST(req: any, res: any) {
  //if (req.method === "POST") {

  
  const body = await req.json();
  console.log("request POST", body);
  try {
    const client = new ImageAnnotatorClient({
      keyFilename: process.env.API_KEY,
    });

    const { imageBase64 } = body;

    const [result] = await client.textDetection({
      image: { content: imageBase64 },
    });

    const detections = result.textAnnotations ?? [];

    res.status(200).json({
      success: true,
      extractedText: detections[0]?.description || "Aucun texte trouvé.",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
  /* } else {
    res.status(405).json({ success: false, message: "Méthode non autorisée" });
  } */
}
