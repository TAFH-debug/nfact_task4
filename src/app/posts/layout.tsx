import {AuthProvider} from "@/app/providers/auth";
import React from "react";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Medium | Posts",
    description: "Make world brighter.",
};

export default function RootLayout({children}: { children: React.ReactNode; }) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}
