import { NextResponse } from "next/server";
import { OpenAI } from "openai";

export const config = {
  api: {
    bodyParser: true,
  },
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: any) {
  try {
    // Récupérer le texte envoyé dans la requête
    const { text } = await request.json();

    // Définir le prompt pour l'analyse de texte
    const prompt = `
    Vous devez analyser un devis selon les critères suivants et fournir un pourcentage de fiabilité global sur 100, ainsi que des remarques claires et concises pour chaque critère. Vous devez également ajouter une conclusion concise résumant la qualité globale du devis. Votre réponse doit être structurée strictement comme suit :
    
    Critères d'analyse et instructions :
    1. **Identité de l'artisan** : Vérifiez si le nom de l'artisan ou de l'entreprise est clairement mentionné.
    2. **Numéro de SIRET** : Vérifiez si le numéro de SIRET ou une preuve de l'existence de l'entreprise est mentionnée.
    3. **Tarif par rapport aux tendances du marché** : Vérifiez si le tarif semble cohérent avec les standards du marché pour ce type de travail.
    4. **Cohérence du devis** : Vérifiez si le devis contient des informations claires, bien organisées et compréhensibles.
    5. **Respect des normes légales** : Vérifiez si les mentions légales obligatoires sont présentes (par exemple : conditions générales, taxes, délais).
    6. **Estimation du délai de livraison** : Vérifiez si le délai proposé est réaliste et adapté aux travaux décrits.
    7. **Garanties et assurances** : Vérifiez si les garanties (décennale, responsabilité civile, etc.) sont mentionnées.
    
    **Format de réponse attendu :**
    Fiabilité globale : [Pourcentage basé sur les critères respectés]
    Détails :
    - Identité de l'artisan : [Statut - Exemple : "Présente", "Non mentionnée"]
    - Numéro de SIRET : [Statut - Exemple : "Mentionné", "Non mentionné"]
    - Tarif par rapport aux tendances du marché : [Statut - Exemple : "Cohérent avec le marché", "Trop élevé"]
    - Cohérence du devis : [Statut - Exemple : "Cohérent", "Manque de clarté"]
    - Respect des normes légales : [Statut - Exemple : "Conforme", "Certaines normes manquent"]
    - Estimation du délai de livraison : [Statut - Exemple : "Réaliste", "Délais trop courts"]
    - Garanties et assurances : [Statut - Exemple : "Mentionnées", "Non mentionnées"]
    
    **Conclusion :**
    Ajoutez une conclusion concise résumant la qualité globale du devis, par exemple : 
    - "Le devis est fiable et bien structuré, avec des informations complètes."
    - "Le devis présente des lacunes importantes, notamment sur les garanties et les normes légales."
    
    **ça ne semble pas être un devis :**
    Indiquez clairement que le texte ne correspond pas aux critères d'un devis standard et fournissez des recommandations pour aider l'utilisateur à améliorer ou vérifier son document.
    
    **Texte à analyser :**
    ${text}
    
    **Important :** Répondez uniquement dans le format demandé. Ne donnez pas d'explications supplémentaires ou d'interprétations inutiles.
    `;

    // Appeler l'API d'OpenAI pour générer une réponse
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });

    const rawText = response.choices[0].message.content.trim();

    // Analyser la réponse brute pour extraire les données
    const lines = rawText.split("\n").map((line) => line.trim());
    let reliability = null;
    let details = {};
    let conclusion = "";

    lines.forEach((line) => {
      if (line.startsWith("Fiabilité globale")) {
        reliability = parseInt(line.split(":")[1].trim().replace("%", ""), 10);
      } else if (line.startsWith("-")) {
        const [key, value] = line
          .substring(1)
          .split(":")
          .map((item) => item.trim());
        details[key] = value;
      } else if (line.startsWith("Conclusion")) {
        conclusion = line.replace("Conclusion :", "").trim();
      }
    });

    const isDevisValid = reliability > 50; // Considérer un devis "valide" si fiabilité > 50%

    // Construction de la conclusion basée sur l'analyse complète
    if (!isDevisValid) {
      // Cas où le devis a une faible fiabilité
      const issues = Object.entries(details)
        .filter(
          ([key, value]) =>
            value === "Non mentionné" || value === "Non conforme"
        )
        .map(([key]) => key.toLowerCase());

      const issueSummary = issues.length
        ? `Les principaux problèmes identifiés concernent : ${issues.join(
            ", "
          )}.`
        : "Le devis présente des lacunes significatives.";

      conclusion = `
    Le devis semble incomplet ou non conforme, avec une fiabilité estimée à ${reliability}%. 
    ${issueSummary} Veuillez vérifier et corriger les éléments manquants pour assurer la validité du document.
  `;
    } else {
      // Cas où le devis a une fiabilité acceptable ou élevée
      const strengths = Object.entries(details)
        .filter(
          ([key, value]) =>
            value !== "Non mentionné" && value !== "Non conforme"
        )
        .map(([key]) => key.toLowerCase());

      const strengthSummary = strengths.length
        ? `Les points forts incluent : ${strengths.join(", ")}.`
        : "Le devis respecte les critères essentiels.";

      conclusion = `
    Le devis est globalement fiable, avec une fiabilité estimée à ${reliability}%. 
    ${strengthSummary} Toutefois, assurez-vous de relire le document pour confirmer qu'il répond bien à vos besoins spécifiques.
  `;
    }

    // Retourner les données formatées en JSON
    return NextResponse.json({
      status: 200,
      reliability,
      details,
      conclusion,
    });
  } catch (error) {
    console.error("Erreur lors de l'analyse :", error);
    return NextResponse.json({
      status: 500,
      error: "Erreur lors de l'analyse du texte.",
    });
  }
}
