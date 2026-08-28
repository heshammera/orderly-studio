import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio Philosophy & Operating Model | ORDERLY Studio",
  description:
    "ORDERLY is a senior multidisciplinary collective: deep cloud engineering, royal art direction, and algorithmic performance marketing — fused into one studio with zero junior overhead.",
  keywords: [
    "creative studio egypt", "software studio cairo", "senior engineering studio",
    "استوديو تقني مصر", "استوديو إبداعي القاهرة", "فلسفة العمل ORDERLY"
  ],
  openGraph: {
    title: "Studio Philosophy — ORDERLY Studio",
    description: "Engineering, design, and growth fused at the foundational level. No juniors on client budgets.",
    url: "https://orderly-studio.vercel.app/studio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio Philosophy — ORDERLY Studio",
    description: "Engineering, design, and growth fused at the foundational level. No juniors on client budgets.",
  },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
