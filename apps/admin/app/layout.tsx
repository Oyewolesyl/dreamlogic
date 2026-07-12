import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dream Logic",
  description: "Dream Logic Astrology suite."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
