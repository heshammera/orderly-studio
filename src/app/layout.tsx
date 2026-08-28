import type { Metadata } from "next";
import "../styles/globals.css";
import { LocaleProvider } from "@/context/LocaleContext";

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
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&family=Cairo:wght@400;600;700;900&family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-obsidian text-white selection:bg-engineering-blue selection:text-white">
        <div className="noise-overlay" />
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
