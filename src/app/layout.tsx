import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})


export const metadata: Metadata = {
  title: "Nutrispark",
  description: "Discover the nutritional values of your favorite foods, Use the search below toget started",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body  className={cn(
          "min-h-screen bg-background font-sans antialiased dark",
          fontSans.variable
        )}>
        {children}
      </body>
    </html>
  );
}
