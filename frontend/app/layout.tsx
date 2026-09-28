import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SaaSFlow | Subscription Management Demo",
  description: "Dummy SaaS subscription management project built with Next.js and Express."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
