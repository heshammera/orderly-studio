import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Folio — Production Case Studies | ORDERLY Studio",
  description:
    "Explore ORDERLY's real production platforms: PropTech SaaS, luxury e-commerce, AI automation, and brand systems serving 185K+ active users processing 1.8B+ EGP.",
  keywords: [
    "case studies", "production platforms", "PropTech", "SaaS", "brand identity",
    "dراسات حالة", "مشاريع منتجة", "أوردرلي"
  ],
  openGraph: {
    title: "Production Case Studies — ORDERLY Studio",
    description: "Real platforms. Verified metrics. 185K+ users. 1.8B+ EGP in transactions managed.",
    url: "https://orderly-studio.vercel.app/work",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Production Case Studies — ORDERLY Studio",
    description: "Real platforms. Verified metrics. 185K+ users. 1.8B+ EGP in transactions managed.",
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
