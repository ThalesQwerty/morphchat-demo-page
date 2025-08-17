import { Theme } from "../types/Theme";
import { Color } from "./Color";

export const defaultLightTheme = {
    primary: Color.purple,
    secondary: Color.gray200,
    background: Color.gray100,
    contrast: Color.white,
    text: Color.gray800,
    textLight: Color.gray500,
    border: Color.gray200,

    components: {
        footer: {
            background: Color.gray100,
        }
    }
} as const satisfies Theme;

export const defaultDarkTheme = {
    primary: Color.purple,
    secondary: Color.gray700,
    background: Color.gray800,
    contrast: Color.white,
    text: Color.gray100,
    textLight: Color.gray300,
    border: Color.gray800,

    components: {
        footer: {
            background: Color.gray900,
        },
        input: {
            background: Color.gray700,
        }
    }
} as const satisfies Theme;