import { Inter, Barlow, Poppins } from "next/font/google";

export const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-barlow",
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins",
});
