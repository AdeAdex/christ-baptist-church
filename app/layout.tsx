import type { Metadata } from "next";
import { nunito, inter, roboto, poppins } from "@/app/fonts/fonts";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

// Metadata for improved SEO
export const metadata: Metadata = {
  metadataBase: new URL("https://www.christbaptistchurch.com"),
  title: "Christ Baptist Church | Welcome",
  description:
    "Christ Baptist Church - A place to worship, connect, and grow in faith. Led by Rev J.I Oyelekan.",
  keywords: [
    "Christ Baptist Church",
    "Church",
    "Faith",
    "Worship",
    "Christian Community",
  ],
  authors: [{ name: "Adeolu", url: "https://www.christbaptistchurch.com" }],
  openGraph: {
    title: "Christ Baptist Church",
    description: "A place to worship, connect, and grow in faith.",
    url: "https://www.christbaptistchurch.com",
    siteName: "Christ Baptist Church",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Christ Baptist Church Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Christ Baptist Church",
    description: "A place to worship, connect, and grow in faith.",
    images: ["/twitter-image.jpg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="index, follow" />
      </head>
      <body
        className={`${inter.variable} ${nunito.variable} ${roboto.variable} ${poppins.variable} antialiased`}
      >
        <MantineProvider>
          <Navbar />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
