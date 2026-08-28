import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Scope & Cost Estimator | ORDERLY Studio",
  description:
    "Estimate your project's scope, timeline (in sprints), and investment range in Egyptian Pounds (EGP) with live interactive calculation. SaaS, AI, branding, mobile apps, and more.",
  keywords: [
    "project cost estimator", "SaaS cost calculator", "software development cost egypt",
    "تقدير تكلفة مشروع", "حاسبة ميزانية البرمجيات", "أسعار تطوير تطبيقات مصر"
  ],
  openGraph: {
    title: "Estimate Your Project Scope & Budget | ORDERLY Studio",
    description: "Interactive real-time calculator. Get a live estimate in EGP for your SaaS, AI, brand, or mobile app project.",
    url: "https://orderly-studio.vercel.app/estimator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Estimate Your Project Scope & Budget | ORDERLY Studio",
    description: "Interactive real-time calculator. Get a live estimate in EGP for your SaaS, AI, brand, or mobile app project.",
  },
};

export default function EstimatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
