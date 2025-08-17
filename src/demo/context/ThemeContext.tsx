import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Color } from "../../lib/constants/Color";

export type AppTheme = "light" | "dark" | "auto";

interface ThemeContextType {
    theme: AppTheme;
    setTheme: (theme: AppTheme) => void;
    resolvedTheme: "light" | "dark";
    colorTheme: Color;
    setColorTheme: (color: Color) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useAppTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useAppTheme must be used within a ThemeProvider");
    }
    return context;
}

interface ThemeProviderProps {
    children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState<AppTheme>(() => {
        // Check localStorage first
        const saved = localStorage.getItem("app-theme");
        if (saved && ["light", "dark", "auto"].includes(saved)) {
            return saved as AppTheme;
        }
        return "auto";
    });

    const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(() => {
        // Initialize resolvedTheme correctly based on the initial theme
        const initialTheme = localStorage.getItem("app-theme") || "auto";
        if (initialTheme === "auto") {
            return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        }
        return initialTheme as "light" | "dark";
    });

    const [colorTheme, setColorTheme] = useState<Color>(() => {
        // Check localStorage for saved color theme
        const saved = localStorage.getItem("app-color-theme");
        if (saved && Object.values(Color).includes(saved as Color)) {
            return saved as Color;
        }
        return Color.purple;
    });

    // Detect system theme
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        
        const updateResolvedTheme = () => {
            const newResolvedTheme = theme === "auto" 
                ? (mediaQuery.matches ? "dark" : "light")
                : theme;
            
            console.log(`Theme changed: ${theme} -> ${newResolvedTheme}`);
            setResolvedTheme(newResolvedTheme);
        };

        updateResolvedTheme();
        mediaQuery.addEventListener("change", updateResolvedTheme);

        return () => {
            mediaQuery.removeEventListener("change", updateResolvedTheme);
        };
    }, [theme]);

    // Save theme to localStorage
    useEffect(() => {
        localStorage.setItem("app-theme", theme);
    }, [theme]);

    // Save color theme to localStorage
    useEffect(() => {
        localStorage.setItem("app-color-theme", colorTheme);
    }, [colorTheme]);

    // Apply theme to document
    useEffect(() => {
        const root = document.documentElement;
        
        // Remove existing theme classes
        root.classList.remove("theme-light", "theme-dark");
        
        // Add current theme class
        root.classList.add(`theme-${resolvedTheme}`);
        
        // Set data attribute for CSS targeting
        root.setAttribute("data-theme", resolvedTheme);
        
        console.log(`Applied theme class: theme-${resolvedTheme}`);
    }, [resolvedTheme]);

    const value = {
        theme,
        setTheme,
        resolvedTheme,
        colorTheme,
        setColorTheme,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}
