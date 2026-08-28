import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ORDERLY LABS — R&D Experiments & Internal Tools | ORDERLY Studio",
  description:
    "Explore ORDERLY's internal research lab: Neural Workflow Agents, WebGL Spatial Renderers, Commerce Edge Architecture, and Generative Brand Systems built for the future.",
  keywords: [
    "AI research lab", "WebGL experiments", "neural agents", "generative branding",
    "مختبر أبحاث الذكاء الاصطناعي", "تجارب WebGL", "أدوات داخلية ORDERLY"
  ],
  openGraph: {
    title: "ORDERLY LABS — Where We Experiment | ORDERLY Studio",
    description: "Internal R&D lab. Neural AI agents, WebGL spatial renderers, edge commerce, and generative brand systems.",
    url: "https://orderly-studio.vercel.app/labs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ORDERLY LABS — Where We Experiment | ORDERLY Studio",
    description: "Internal R&D lab. Neural AI agents, WebGL spatial renderers, edge commerce, and generative brand systems.",
  },
};

export default function LabsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
