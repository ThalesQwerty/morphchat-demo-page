import { useLayoutEffect } from "react";
import { Theme } from "../types/Theme";
import { kebabCase } from "lodash";

export function useTheme(theme: Theme) {
    useLayoutEffect(() => {
        const root = document.documentElement;

        const existingProperties = Array.from(root.style)
            .filter(property => property.startsWith("--qwertychat"));

        existingProperties.forEach(property => {
            root.style.removeProperty(property);
        });

        applyThemeRecursively(root, theme, "qwertychat");
    }, [theme]);
}

function applyThemeRecursively(element: HTMLElement, obj: any, prefix: string = "") {
    Object.keys(obj).forEach(key => {
        const value = obj[key];
        const cssVar = prefix ? `${prefix}-${key}` : key;
        
        if (typeof value === "string") {
            element.style.setProperty("--" + kebabCase(cssVar), value);
        } else if (typeof value === "object" && value !== null) {
            applyThemeRecursively(element, value, cssVar.replace("--", ""));
        }
    });
}