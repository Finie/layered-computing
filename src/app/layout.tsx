import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Layered Computing Curriculum",
  description:
    "A language-aware guide from primitive data and data structures through algorithms and modern software systems.",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
