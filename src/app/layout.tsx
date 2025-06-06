import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Skincare Event Queue Manager",
  description: "Digital queue management system for skincare events and consultations",
  keywords: "skincare, queue management, event management, digital check-in",
  authors: [{ name: "Your Company Name" }],
  robots: "index, follow",
  openGraph: {
    title: "Skincare Event Queue Manager",
    description: "Digital queue management system for skincare events",
    type: "website",
    locale: "en_US",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          {children}
          <Toaster position="top-right" />
        </ErrorBoundary>
      </body>
    </html>
  );
}
