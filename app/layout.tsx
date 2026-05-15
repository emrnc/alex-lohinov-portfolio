import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import "./globals.css";

const metadataBase = new URL("https://emrnc.vercel.app/");
const title = "Alex Lohinov - Product Designer for Digital Interfaces";
const description =
  "I am a Product Designer shaping clear, scalable digital products from early concept and product strategy to polished interface systems for real users.";

export const metadata: Metadata = {
  metadataBase,
  title,
  description,
  icons: {
    icon: "/favicon.jpg",
    shortcut: "/favicon.jpg",
    apple: "/favicon.jpg",
  },
  openGraph: {
    title,
    description,
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
    title,
    description,
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
        <Script id="scroll-restoration" strategy="beforeInteractive">
          {`
            const navigationEntry = performance.getEntriesByType("navigation")[0];
            const isReload = navigationEntry?.type === "reload";

            if ("scrollRestoration" in history) {
              history.scrollRestoration = isReload ? "manual" : "auto";
            }

            if (isReload) {
              window.scrollTo(0, 0);
            }
          `}
        </Script>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
