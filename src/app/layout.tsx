import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Cairo, Alexandria, JetBrains_Mono } from "next/font/google";
import "../styles/globals.css";
import { LocaleProvider } from "@/context/LocaleContext";

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
  title: "ORDERLY — Creative Technology Studio | التكنولوجيا × التصميم",
  description:
    "An independent creative technology studio engineering scalable software, custom AI systems, and art-directed digital brand experiences.",
  keywords: [
    "Creative Technology Studio",
    "Software Engineering",
    "AI & Automation",
    "SaaS Platforms",
    "Brand Identity",
    "UI/UX Design",
    "ORDERLY",
    "أوردرلي",
    "استوديو تكنولوجيا إبداعية",
  ],
  authors: [{ name: "ORDERLY Studio" }],
  openGraph: {
    title: "ORDERLY — Creative Technology Studio",
    description: "We turn ambitious ideas into digital experiences. Technology × Design.",
    url: "https://orderlyshops.com",
    siteName: "ORDERLY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ORDERLY — Creative Technology Studio",
    description: "We turn ambitious ideas into digital experiences. Technology × Design.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${jakarta.variable} ${cairo.variable} ${alexandria.variable} ${mono.variable}`}
    >
      <body className="font-sans antialiased bg-obsidian text-white selection:bg-engineering-blue selection:text-white">
        <div className="noise-overlay" />
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
