import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AfscheidPlanner - Zelf een uitvaart organiseren",
  description: "AfscheidPlanner helpt je stap voor stap bij het organiseren van een persoonlijk afscheid. Duidelijke taken, transparante kosten, en hulp van familie en vrienden.",
  keywords: ["uitvaart", "zelf organiseren", "begrafenis", "crematie", "afscheid", "checklist"],
  authors: [{ name: "AfscheidPlanner" }],
  openGraph: {
    title: "AfscheidPlanner - Zelf een uitvaart organiseren",
    description: "Organiseer zelf een persoonlijk afscheid met ondersteuning van AfscheidPlanner.",
    type: "website",
    locale: "nl_NL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
