"use client";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {redirect, usePathname, useRouter} from "next/navigation";

type AuthData = {}

const AuthContext = createContext<AuthData | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const path = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (window !== undefined) {
            if (localStorage.getItem("token") === null) {
                router.push("/login")
            }
        }
    }, [path])

    return <AuthContext.Provider value={{}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const context =  useContext(AuthContext);
    if (context === null || context === undefined) throw new Error('useAuth must be used within a AuthProvider');
    return context;
}