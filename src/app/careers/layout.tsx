import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join the Network — Senior Specialists | ORDERLY Studio",
  description:
    "ORDERLY is looking for senior specialists: engineers, designers, AI researchers, motion artists, and growth marketers. Join a collective that builds real production systems.",
  keywords: [
    "join creative studio", "freelance engineer egypt", "senior designer cairo",
    "انضم للاستوديو", "عمل مستقل تصميم", "مهندس برمجيات مصر"
  ],
  openGraph: {
    title: "Join the ORDERLY Network | ORDERLY Studio",
    description: "We look for senior specialists in engineering, design, AI, and growth. No juniors. No layers.",
    url: "https://orderly-studio.vercel.app/careers",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Join the ORDERLY Network | ORDERLY Studio",
    description: "We look for senior specialists in engineering, design, AI, and growth. No juniors. No layers.",
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
