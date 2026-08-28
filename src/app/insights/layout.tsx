import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights — Engineering, Design & AI Magazine | ORDERLY Studio",
  description:
    "ORDERLY's editorial magazine on creative technology: scalable SaaS architecture, luxury brand psychology, AI business value, and performance marketing strategy.",
  keywords: [
    "creative technology blog", "SaaS engineering insights", "AI business strategy",
    "brand design magazine", "مجلة تقنية", "مقالات تصميم وبرمجة", "ذكاء اصطناعي"
  ],
  openGraph: {
    title: "Insights Magazine — ORDERLY Studio",
    description: "Editorial on engineering, design, AI, and growth. Written by practitioners who build.",
    url: "https://orderly-studio.vercel.app/insights",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights Magazine — ORDERLY Studio",
    description: "Editorial on engineering, design, AI, and growth. Written by practitioners who build.",
  },
};

export default function InsightsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
