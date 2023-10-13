"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { CrowdfundingProvider } from "@/Context/Crowdfunding";
import { Footer, NavBar } from "@/Components";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <CrowdfundingProvider>
        <body className={inter.className}>
          <NavBar />
          {children}
          <Footer />
        </body>
      </CrowdfundingProvider>
    </html>
  );
}
