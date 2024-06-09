import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/header";
import {ThemeProvider} from "@/app/providers/theme";
import React from "react";
import Footer from "@/app/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Medium",
    description: "Make world brighter.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
            <ThemeProvider>
                    <Header />
                    {children}
                    <Footer />
            </ThemeProvider>
            </body>
        </html>
    );
}
