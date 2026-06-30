import React from "react";
import "./globals.css";

export const metadata = {
  title: "AroundYou",
  description: "AroundYou frontend"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: "#000", color: "#39ff14" }}>
        {children}
      </body>
    </html>
  );
}
