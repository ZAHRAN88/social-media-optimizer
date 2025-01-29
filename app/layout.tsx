import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Toaster } from "@/components/ui/toaster"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Post Optimizer | Enhance Your Social Media Content",
  description: "Optimize your social media posts with AI-powered suggestions for better engagement, reach, and impact across all platforms.",
  keywords: "social media optimization, AI content optimization, social media analytics, content enhancement, social media marketing",
  openGraph: {
    title: "AI Post Optimizer | Enhance Your Social Media Content",
    description: "Optimize your social media posts with AI-powered suggestions for better engagement, reach, and impact across all platforms.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster 
        
      />
      </body>
    </html>
  );
}
