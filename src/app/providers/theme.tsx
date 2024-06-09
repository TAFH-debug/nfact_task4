"use client"
import {createContext, ReactNode, useContext, useEffect, useState} from "react";

type ThemeAction = {
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeAction | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState("none");

    useEffect(() => {
        const theme = localStorage.getItem("theme");
        if (theme !== null) {
            setTheme(theme);
        }
    }, [])

    useEffect(() => {
        if (theme === "none") return;
        if (theme === "dark") {
            document.body.classList.add("dark");
        }
        else if (theme ==="light") {
            document.body.classList.remove("dark");
        }
        localStorage.setItem("theme", theme)
    }, [theme])

    return <ThemeContext.Provider value={{toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark")}}>
        {children}
    </ThemeContext.Provider>;
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined || context === null) throw new Error("useTheme must be used within ThemeProvider");
    return context;
}
