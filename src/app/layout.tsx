import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Aditya Store - Online Grocery Delivery",
  description:
    "Fast and reliable online grocery delivery service. Order groceries online and get them delivered within 15 km radius in Kasganj.",
  keywords: [
    "grocery",
    "online delivery",
    "fresh vegetables",
    "dairy",
    "Kasganj",
  ],
  authors: [{ name: "Aditya Store" }],
  creator: "Aditya Store",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aditya-store.local",
    siteName: "Aditya Store",
    title: "Aditya Store - Online Grocery Delivery",
    description:
      "Fast and reliable online grocery delivery service. Order groceries online and get them delivered within 15 km radius in Kasganj.",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
