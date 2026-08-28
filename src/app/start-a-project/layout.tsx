import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start a Project — Get a Custom Proposal | ORDERLY Studio",
  description:
    "Submit your project brief to ORDERLY Studio. We respond within 24 hours with a tailored proposal covering scope, timeline, and investment in Egyptian Pounds.",
  keywords: [
    "hire software studio", "start digital project", "custom software proposal",
    "ابدأ مشروع رقمي", "استمارة طلب مشروع", "عرض سعر برمجة"
  ],
  openGraph: {
    title: "Start Your Project | ORDERLY Studio",
    description: "Submit your brief. Get a tailored proposal within 24 hours covering scope, timeline, and investment.",
    url: "https://orderly-studio.vercel.app/start-a-project",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Start Your Project | ORDERLY Studio",
    description: "Submit your brief. Get a tailored proposal within 24 hours covering scope, timeline, and investment.",
  },
};

export default function StartProjectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
