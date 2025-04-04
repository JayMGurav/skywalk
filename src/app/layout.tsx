import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { FlightCheckoutDetailsContextProvider } from "@/context/FlightCheckoutDetailsContext";
import { PageHeader } from "@/components/page-header";
import Head from 'next/head'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkyWay",
  description: "Booking your next travel itenary with SkyWay",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PageHeader />
          <FlightCheckoutDetailsContextProvider initialState={null}>
            {children}
          </FlightCheckoutDetailsContextProvider>
        <Toaster />
      </body>
    </html>
  );
}
