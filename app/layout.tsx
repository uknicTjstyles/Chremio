import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Chremio",
    description: "Manage your money. Build your future.",
    };

    export const viewport: Viewport = {
      themeColor: "#0B1220",
        colorScheme: "dark",
        };

        export default function RootLayout({
          children,
          }: {
            children: React.ReactNode;
            }) {
              return (
                  <html lang="en" className={`${sora.variable} ${inter.variable}`}>
                        <body>{children}</body>
                            </html>
                              );
                              }