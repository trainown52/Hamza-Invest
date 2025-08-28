'use client';

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const noLayoutRoutes = ["/login", "/signup"];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const publicRoutes = ["/login", "/signup"];
      if (!token && !publicRoutes.includes(window.location.pathname)) {
        window.location.href = "/login";
      }
    }
  }, [pathname]);

  const hideLayout = noLayoutRoutes.includes(pathname);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        {/* Show Navbar only if not in login/signup */}
        {!hideLayout && <Navbar />}

        <main className="flex-1">{children}</main>

        {/* Show Footer only if not in login/signup */}
        {!hideLayout && <Footer />}
      </body>
    </html>
  );
}
