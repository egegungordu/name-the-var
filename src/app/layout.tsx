import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Name the Var",
  description:
    "Name the Var is a game to help you gain intuition for variable naming.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "flex h-dvh flex-col bg-neutral-50 px-4 text-sm md:px-10",
        )}
      >
        <Header />

        {children}

        <Footer />
      </body>
    </html>
  );
}
