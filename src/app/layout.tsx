import type { Metadata } from "next";
import { inter, poppins } from "./fonts";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "MinerPlace - Excellence in home supplying",
  description: "Everything a Miner needs, in the same Place!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-inter}`}>
        {children}
      </body>
    </html>
  );
}
