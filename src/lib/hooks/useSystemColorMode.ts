import { useState, useEffect } from "react";

export function useSystemColorMode(): "light" | "dark" {
    const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        
        const updateTheme = (e: MediaQueryListEvent | MediaQueryList) => {
            setSystemTheme(e.matches ? "dark" : "light");
        };

        // Set initial value
        updateTheme(mediaQuery);

        // Listen for changes
        mediaQuery.addEventListener("change", updateTheme);

        return () => {
            mediaQuery.removeEventListener("change", updateTheme);
        };
    }, []);

    return systemTheme;
}
