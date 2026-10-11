import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/layout/header";
import { Footer } from "@/layout/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PawWell | Des animaux heureux, des jours meilleurs",
  description:
    "Alimentation, jouets, hygiène et soins sélectionnés pour vos compagnons.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white font-sans text-[#10284b] antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
