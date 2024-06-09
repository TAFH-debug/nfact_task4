"use client";
import {redirect} from "next/navigation";
import {createContext, ReactNode, useContext} from "react";

type AuthData = {}

const AuthContext = createContext<AuthData | null>(null);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const token = localStorage.getItem("token");
    if (token === null) return redirect("/login");
    return <AuthContext.Provider value={{}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const context =  useContext(AuthContext);
    if (context === null || context === undefined) throw new Error('useAuth must be used within a AuthProvider');
    return context;
}