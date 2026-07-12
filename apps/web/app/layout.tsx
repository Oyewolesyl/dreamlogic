import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dream Logic",
  description: "A complete astrology workspace for deep chart study, timing, reflection, and professional practice.",
  applicationName: "Dream Logic"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
