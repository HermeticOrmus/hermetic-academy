import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { LanguageLensProvider } from "@/lib/hooks/useLanguageLens";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hermetic Academy | Ancient Wisdom, Modern Clarity",
  description: "Learn the 7 Hermetic Principles that explain how reality works. Transform your understanding of yourself, others, and the world. Free forever.",
  keywords: ["hermetic", "principles", "philosophy", "wisdom", "self-improvement", "consciousness", "reality", "understanding"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-cosmic-black text-cosmic-white antialiased flex flex-col">
        <LanguageLensProvider>
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageLensProvider>
      </body>
    </html>
  );
}
