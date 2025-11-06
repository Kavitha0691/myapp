import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Calculator App",
  description: "Simple calculator built with Next.js, TypeScript, and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
