import { Theme } from "../types/Theme";
import { Color } from "../types/Color";

export const defaultLightTheme = {
    primary: Color.purple,
    secondary: Color.gray200,
    background: Color.white,
    contrast: Color.white,
    text: Color.gray800,
    textLight: Color.gray500,
    border: Color.gray200,

    components: {
        footer: {
            background: Color.gray100,
            text: Color.gray500,
        }
    }
} as const satisfies Theme;

export const defaultDarkTheme = {
    primary: Color.purple,
    secondary: Color.gray100,
    background: Color.white,
    contrast: Color.white,
    text: Color.gray900,
    textLight: Color.gray500,
    border: Color.gray200,

    components: {
        footer: {
            background: Color.gray900,
            text: Color.gray200,
        }
    }
} as const satisfies Theme;