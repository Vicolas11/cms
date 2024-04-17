import StoreProvider from "./store/StoreProvider";
import { Roboto } from "next/font/google";
import type { Metadata } from "next";
import "./globals.scss";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "CMS | %s",
    default: "CMS | Home",
  },
  description: "Complaint Management System for students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
