import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hermetic Youth | Discover the 7 Principles",
  description: "Interactive experiences teaching the 7 Hermetic Principles to youth. Timeless wisdom, modern exploration.",
  keywords: ["hermetic", "principles", "youth", "education", "wisdom", "philosophy"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-cosmic-black text-cosmic-white antialiased">
        {children}
      </body>
    </html>
  );
}
