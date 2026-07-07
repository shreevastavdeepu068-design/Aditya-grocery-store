import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Aditya Store - Online Grocery Delivery in Kasganj",
  description:
    "Fast and reliable online grocery delivery service in Kasganj. Fresh groceries delivered within 15 km radius. Order now from Aditya Store.",
  keywords: [
    "grocery delivery",
    "online grocery",
    "fresh vegetables",
    "dairy products",
    "Kasganj",
    "Sidhpura",
    "fast delivery",
  ],
  authors: [{ name: "Aditya Store" }],
  creator: "Aditya Store",
  applicationName: "Aditya Store - Online Delivery",
  formatDetection: {
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aditya-store.local",
    siteName: "Aditya Store",
    title: "Aditya Store - Online Grocery Delivery in Kasganj",
    description:
      "Fast and reliable online grocery delivery service. Fresh groceries delivered within 15 km radius. Phone: +91 9548924542",
    images: [
      {
        url: "https://aditya-store.local/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aditya Store - Online Grocery Delivery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Store - Online Grocery Delivery",
    description: "Fast grocery delivery in Kasganj within 15 km radius",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  alternates: {
    canonical: "https://aditya-store.local",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
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
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="white" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-white text-gray-900`}>
        {children}
      </body>
    </html>
  );
}
