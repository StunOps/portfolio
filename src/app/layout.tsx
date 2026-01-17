import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import SplashCursor from "@/components/ui/SplashCursor";
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
  title: "Stunley Opeña | Multimedia Designer & Developer",
  description: "Explore the professional portfolio of Stunley Opeña, specializing in 3D CAD Design, UI/UX, and Brand Identity. Bringing creative visions to life with precision and innovation.",
  keywords: ["Stunley Opeña", "Multimedia Designer", "3D CAD", "UI/UX Designer", "Portfolio", "Brand Identity", "Creative Developer"],
  authors: [{ name: "Stunley Opeña" }],
  creator: "Stunley Opeña",
  publisher: "Stunley Opeña",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Stunley Opeña | Multimedia Designer & Developer",
    description: "Explore the professional portfolio of Stunley Opeña, specializing in 3D CAD Design, UI/UX, and Brand Identity.",
    url: "https://stundesign-portfolio.vercel.app",
    siteName: "Stunley Opeña Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Stunley Opeña Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stunley Opeña | Multimedia Designer & Developer",
    description: "Explore the professional portfolio of Stunley Opeña, specializing in 3D CAD Design, UI/UX, and Brand Identity.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <SplashCursor />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
