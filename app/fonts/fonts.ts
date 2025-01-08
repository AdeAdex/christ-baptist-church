// app/fonts/fonts.ts

import { Nunito, Inter, Roboto, Poppins } from "next/font/google";

export const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-nunito", // Use CSS variables for better control
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // Add weights you need
  variable: "--font-poppins",
});
