"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";


export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideLayout = pathname.startsWith("/auth");

  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          {!hideLayout && <Header />}
          <main className="flex-1">{children}</main>
          {!hideLayout && <Footer />}
        </div>
      </body>
    </html>
  );
}
