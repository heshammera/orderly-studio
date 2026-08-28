import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Performance Marketing & Algorithmic Growth Engine | ORDERLY Studio",
  description:
    "Scale client revenue with high-ROAS paid media, server-side CAPI tracking, dynamic creative hooks, Klaviyo CRM retention, and conversion rate optimization (CRO).",
  keywords: [
    "performance marketing egypt", "ROAS scaling cairo", "paid ads meta tiktok",
    "server side tracking capi", "CRO optimization", "تسويق رقمي مصر", "إعلانات ممولة", "نمو المبيعات"
  ],
  openGraph: {
    title: "Performance Marketing Engine — ORDERLY Studio",
    description: "Paid social, CAPI tracking, dynamic creatives, and retention funnels engineered for maximum ROAS.",
    url: "https://orderly-studio.vercel.app/marketing",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Performance Marketing Engine — ORDERLY Studio",
    description: "Paid social, CAPI tracking, dynamic creatives, and retention funnels engineered for maximum ROAS.",
  },
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
