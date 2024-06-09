"use client";
import {createContext, ReactNode, useContext} from "react";
import {useRouter} from "next/navigation";

type AuthData = {}

const AuthContext = createContext<AuthData | null>(null);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    let token: string | null = null;
    const router = useRouter();

    if (window !== undefined) {
        token = localStorage.getItem("token");
    }

    if (token === null) {
        router.push("/login");
        return <></>
    }
    return <AuthContext.Provider value={{}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const context =  useContext(AuthContext);
    if (context === null || context === undefined) throw new Error('useAuth must be used within a AuthProvider');
    return context;
}