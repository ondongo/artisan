import { ImageAnnotatorClient } from "@google-cloud/vision";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  //if (req.method === "POST") {

  const body = await req.json();
  //console.log("request POST", body);
  try {
    const client = new ImageAnnotatorClient({
      keyFilename: process.env.API_KEY,
    });

    const { imageBase64 } = body;

    const [result] = await client.textDetection({
      image: { content: imageBase64 },
    });


if (result)
    console.log(result);
    const detections = result.textAnnotations ?? [];

    console.log("=======>", detections);
    return NextResponse.json({
      success: true,
      extractedText: detections[0]?.description || "Aucun texte trouvé.",
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error });
  }
  /* } else {
    res.status(405).json({ success: false, message: "Méthode non autorisée" });
  } */
}
