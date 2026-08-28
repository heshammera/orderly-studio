import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Cairo, Alexandria, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "../styles/globals.css";
import { LocaleProvider } from "@/context/LocaleContext";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { CookieBanner } from "@/components/ui/CookieBanner";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://orderly-studio.vercel.app"),
  title: {
    default: "ORDERLY Studio — Creative Technology | Engineering × Design × Growth",
    template: "%s | ORDERLY Studio",
  },
  description:
    "ORDERLY is an independent senior creative technology studio in Egypt engineering scalable SaaS platforms, custom AI systems, luxury brand identities, and performance marketing systems.",
  keywords: [
    "creative technology studio egypt",
    "SaaS engineering cairo",
    "AI automation egypt",
    "brand identity design",
    "UI UX studio",
    "digital studio egypt",
    "ORDERLY",
    "أوردرلي",
    "استوديو تكنولوجيا إبداعية مصر",
    "تطوير تطبيقات مصر",
    "هوية بصرية",
    "ذكاء اصطناعي مصر",
  ],
  authors: [{ name: "ORDERLY Studio", url: "https://orderly-studio.vercel.app" }],
  creator: "ORDERLY Studio",
  publisher: "ORDERLY Studio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "ORDERLY — Creative Technology Studio | Engineering × Design × Growth",
    description:
      "Senior multidisciplinary studio engineering SaaS platforms, AI systems, luxury brand identities, and performance marketing. 185K+ users. 1.8B+ EGP managed.",
    url: "https://orderly-studio.vercel.app",
    siteName: "ORDERLY Studio",
    type: "website",
    locale: "ar_EG",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: "ORDERLY — Creative Technology Studio",
    description:
      "Engineering × Design × Growth. Senior studio in Egypt delivering SaaS, AI, brand identity, and performance marketing.",
    creator: "@orderlyStudio",
  },
  alternates: {
    canonical: "https://orderly-studio.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      className={`dark ${jakarta.variable} ${cairo.variable} ${alexandria.variable} ${mono.variable}`}
    >
      <body className="font-sans antialiased bg-obsidian text-white selection:bg-engineering-blue selection:text-white">
        <div className="noise-overlay" />
        <LocaleProvider>{children}</LocaleProvider>
        <FloatingWhatsApp />
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
