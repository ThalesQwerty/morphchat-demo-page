import { useLayoutEffect } from "react";
import { Theme } from "../types/Theme";

export function useTheme(theme: Theme) {
    useLayoutEffect(() => {
        const root = document.documentElement;

        Object.keys(root.style).forEach(key => {
            if (key.startsWith("--qwertychat")) {
                root.style.removeProperty(key);
            }
        });

        applyThemeRecursively(root, theme, "qwertychat");
    }, [theme]);
}

function applyThemeRecursively(element: HTMLElement, obj: any, prefix: string = "") {
    Object.keys(obj).forEach(key => {
        const value = obj[key];
        const cssVar = prefix ? `--${prefix}-${key}` : `--${key}`;
        
        if (typeof value === "string") {
            element.style.setProperty(cssVar, value);
        } else if (typeof value === "object" && value !== null) {
            applyThemeRecursively(element, value, cssVar.replace("--", ""));
        }
    });
}