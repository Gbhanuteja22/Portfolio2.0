import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ClickSpark from "@/components/effects/ClickSpark";
import Squares from "@/components/effects/Squares";
import CommandPaletteRoot from "@/components/layout/CommandPaletteRoot";

export const metadata: Metadata = {
  title: "Bhanu Teja Gummadavelli — Developer & Designer",
  description:
    "Portfolio of Gummadavelli Bhanu Teja — Senior Full Stack Developer & Designer. Explore projects, experience, and creative work.",
  keywords: [
    "Bhanu Teja",
    "Gummadavelli",
    "Full Stack Developer",
    "Designer",
    "Portfolio",
  ],
  authors: [{ name: "Gummadavelli Bhanu Teja" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* Abril Fatface — heavy premium display font for Bt. logo */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Syne:wght@700;800&display=swap" rel="stylesheet" />
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      </head>
      <body className="noise-overlay antialiased">
        <div className="fixed inset-0 w-full h-full z-[-1] pointer-events-none">
          <Squares
            speed={0.35}
            squareSize={30}
            direction="down"
            borderColor="#e5e7eb"
            hoverFillColor="#f3f4f6"
          />
        </div>
        <CommandPaletteRoot>
          <ClickSpark sparkColor="#60a5fa" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </ClickSpark>
        </CommandPaletteRoot>
      </body>
    </html>
  );
}
