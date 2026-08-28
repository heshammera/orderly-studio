import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services & Capabilities — Engineering, Design & Growth | ORDERLY",
  description:
    "ORDERLY Studio delivers two pillars: Technology, AI & Growth Engineering and Design, Identity & Spatial Systems. Senior specialists. No subcontracting.",
  keywords: [
    "SaaS engineering", "AI automation", "brand identity", "UI UX design", "digital marketing",
    "motion design", "3D packaging", "هندسة برمجيات", "ذكاء اصطناعي", "تصميم هوية", "أوردرلي"
  ],
  openGraph: {
    title: "Services — Technology × Design × Growth | ORDERLY Studio",
    description: "Two pillars. One senior studio. SaaS platforms, AI systems, brand identity, and performance marketing.",
    url: "https://orderly-studio.vercel.app/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services — Technology × Design × Growth | ORDERLY Studio",
    description: "Two pillars. One senior studio. SaaS platforms, AI systems, brand identity, and performance marketing.",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
