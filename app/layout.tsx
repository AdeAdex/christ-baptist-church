// /app/layout.tsx

"use client";

import { nunito, inter, roboto, poppins } from "@/app/fonts/fonts";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import { MantineProvider } from "@mantine/core";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { SnackbarProvider } from "notistack"; // ✅ Import SnackbarProvider
import ThemeProvider from "./context/theme/ThemeProvider";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isDashboard = pathname.includes("/dashboard");

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
      </head>
      <body
        className={`${
          isHomePage || isDashboard ? "" : "mt-[100px] px-4 md:px-16 py-0"
        }  ${inter.variable} ${nunito.variable} ${roboto.variable} ${poppins.variable} antialiased`}
      >
        <ThemeProvider>
        <SessionProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <MantineProvider>
                <SnackbarProvider maxSnack={1} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                {!isDashboard && <Navbar />}
                  {children}
                </SnackbarProvider>
              </MantineProvider>
            </PersistGate>
          </Provider>
        </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
