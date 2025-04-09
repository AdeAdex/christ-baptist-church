// /app/layout.tsx

"use client";

import { nunito, inter, roboto, poppins } from "@/app/fonts/fonts";
import "./globals.css";
import { MantineProvider } from "@mantine/core";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { SnackbarProvider } from "notistack"; // ✅ Import SnackbarProvider
import ThemeProvider from "./context/theme/ThemeProvider";
import LayoutWrapper from "./components/LayoutWrapper";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
      </head>
      <body className={`${inter.variable} ${nunito.variable} ${roboto.variable} ${poppins.variable} antialiased`}>
        <ThemeProvider>
        <SessionProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <MantineProvider>
                <SnackbarProvider maxSnack={1} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                  <LayoutWrapper>{children}</LayoutWrapper>
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
