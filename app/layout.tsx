import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Provider } from "@/lib/provider";
import { defaultMetadata, openGraph, twitter } from "@/lib/shared-metadata";
import Navbar from "@/components/ui/Navbar";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  ...defaultMetadata,
  twitter: {
    ...twitter,
  },
  openGraph: {
    ...openGraph,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geist.className + " dark"}>
        <Provider>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
