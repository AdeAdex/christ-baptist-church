'use client'

import { nunito, inter, roboto, poppins } from "@/app/fonts/fonts";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import { MantineProvider } from "@mantine/core";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
      </head>
      <body
        className={`${
          isHomePage ? "" : "mt-[130px] px-6 md:px-16 py-10"
        }  ${inter.variable} ${nunito.variable} ${roboto.variable} ${poppins.variable} antialiased`}
      >
        <MantineProvider>
          <Navbar />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
