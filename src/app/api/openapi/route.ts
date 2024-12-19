import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

export const config = {
  api: {
    bodyParser: true, 
  },
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request:any) {
  try {
    // Récupérer le texte envoyé dans la requête
    const { text } = await request.json();

    // Définir le prompt pour l'analyse de texte
    const prompt = `
    Vous devez analyser un devis selon les critères suivants et fournir un pourcentage de fiabilité sur 100 :
    
    Critères d'analyse :
    1. Identité de l'artisan : Vérifiez si le nom de l'artisan ou de l'entreprise est mentionné.
    2. Tarif par rapport aux tendances du marché : Vérifiez si le tarif semble cohérent avec le marché.
    3. Vérification de la cohérence du devis : Vérifiez si le devis semble cohérent.
    4. Respect des normes légales : Vérifiez si le devis respecte les normes légales en vigueur.
    5. Estimation du délai de livraison : Vérifiez si le délai estimé est réaliste.
    6. Garanties et assurances : Vérifiez si les garanties sont clairement spécifiées.
    
    Analysez le texte suivant et attribuez un pourcentage de fiabilité en fonction de la présence et de la cohérence des informations dans chaque critère. Si un critère est complètement respecté, attribuez un point, sinon ne donnez aucun point pour ce critère. Calculez ensuite le pourcentage de fiabilité global sur 100.
    
    Texte : 
    ${text}

    Donnez votre réponse sous la forme : 
    Fiabilité du devis : X% 
    `;

    // Appeler l'API d'OpenAI pour générer une réponse
    const response = await openai.chat.completions.create({
      model: 'gpt-4o', 
      messages: [{ role: 'user', content: prompt }],
    });


    console.log(response.choices[0].message);
    const reliabilityText = response.choices[0].message.content.trim();

   
    // Récupérer la fiabilité depuis la réponse d'OpenAI
 /*    const reliabilityMatch = reliabilityText.match(/Fiabilité du devis : (\d+)%/);
    const reliabilityPercentage = reliabilityMatch ? parseInt(reliabilityMatch[1], 10) : 0;
 */
    // Retourner le résultat avec la fiabilité calculée
    return NextResponse.json({
      status: 200,
      //reliability: reliabilityPercentage,
      message: response.choices[0].message.content.trim(),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      error: 'Erreur lors de l\'analyse du texte.',
    });
  }
}
