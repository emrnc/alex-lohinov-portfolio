import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const metadataBase = new URL("https://emrnc.vercel.app/");

export const metadata: Metadata = {
  metadataBase,
  title: "Alex Lohinov - Product Designer",
  description: "I am a Product Designer focused on shaping clear, scalable digital products from concept to interface.",
  icons: {
    icon: "/favicon.jpg",
    shortcut: "/favicon.jpg",
    apple: "/favicon.jpg",
  },
  openGraph: {
    title: "Alex Lohinov - Product Designer",
    description: "I am a Product Designer focused on shaping clear, scalable digital products from concept to interface.",
    images: [
      {
        url: "/social-preview.png",
        width: 2048,
        height: 1024,
        alt: "Alex Lohinov social preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Lohinov - Product Designer",
    description: "I am a Product Designer focused on shaping clear, scalable digital products from concept to interface.",
    images: ["/social-preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
