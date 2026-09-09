import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ulam-nD — prime spiral research workbench",
  description: "n-dimensional Ulam spirals, polynomial line analysis, Hardy–Littlewood constants and RH-equivalent statistics.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
