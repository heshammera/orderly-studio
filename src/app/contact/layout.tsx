import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact ORDERLY Studio — Let's Build Together",
  description:
    "Get in touch with ORDERLY Studio. WhatsApp, email, or project brief — we respond within 24 hours with a tailored proposal for your SaaS, AI, brand, or growth project.",
  keywords: [
    "contact creative studio egypt", "hire software studio cairo",
    "تواصل مع استوديو تقني مصر", "تواصل ORDERLY"
  ],
  openGraph: {
    title: "Contact ORDERLY Studio — Let's Build Together",
    description: "WhatsApp, email, or project brief. We respond within 24 hours with a tailored proposal.",
    url: "https://orderly-studio.vercel.app/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact ORDERLY Studio",
    description: "WhatsApp, email, or project brief. We respond within 24 hours.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
