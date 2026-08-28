import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ORDERLY OS — Client Portal & AI Project Concierge | ORDERLY Studio",
  description:
    "Experience ORDERLY OS: a live interactive client portal featuring real-time project milestone tracking, deliverables repository, and an AI concierge assistant for active projects.",
  keywords: [
    "client portal", "project management", "AI project assistant", "milestone tracker",
    "بوابة العميل", "متابعة المشروع", "مساعد ذكاء اصطناعي للمشاريع"
  ],
  openGraph: {
    title: "ORDERLY OS — Live Client Portal | ORDERLY Studio",
    description: "Real-time project milestones, deliverables repository, and AI concierge. Built for serious clients.",
    url: "https://orderly-studio.vercel.app/orderly-os",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ORDERLY OS — Live Client Portal | ORDERLY Studio",
    description: "Real-time project milestones, deliverables repository, and AI concierge. Built for serious clients.",
  },
};

export default function OrderlyOsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
