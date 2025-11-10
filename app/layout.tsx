import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hermetic Academy | Level Up IRL",
  description: "Ancient wisdom for gamers. You've mastered League, Fortnite, WoW. Apply that same skill to reality. AAA gamification. Free forever.",
  keywords: ["hermetic", "principles", "gaming", "league of legends", "self-improvement", "gamers", "youth", "level up"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-cosmic-black text-cosmic-white antialiased flex flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
