import React from "react";
import type { ReactNode } from "react";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ backgroundColor: "#400", color: "#DFD1F4" }}>
        {children}
      </body>
    </html>
  );
}
