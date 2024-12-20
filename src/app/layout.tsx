import type { Metadata } from "next";
//import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/providers";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
/* const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://artisan-a6u5.vercel.app/"),
  title: "Analysez vos devis avec notre IA",
  description:
    "Obtenez une analyse détaillée et fiable de vos devis grâce à notre intelligence artificielle. Simplifiez votre processus de décision en toute confiance.",
  openGraph: {
    title: "Analysez vos devis avec notre IA",
    description:
      "Découvrez une nouvelle façon d'analyser vos devis. Grâce à notre IA, identifiez les détails importants et prenez des décisions éclairées.",
    images: ["/meta.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Analysez vos devis avec notre IA",
    description:
      "Obtenez une analyse fiable et rapide de vos devis pour une prise de décision éclairée.",
    images: ["/meta.png"],
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <Analytics />
        <Script
          id="crisp-chat"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.$crisp=[];
              window.CRISP_WEBSITE_ID="67015992-6c5f-44e4-9f35-6c29aec4eb43";
              (function(){
                var d=document;
                var s=d.createElement("script");
                s.src="https://client.crisp.chat/l.js";
                s.async=1;
                d.getElementsByTagName("head")[0].appendChild(s);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
