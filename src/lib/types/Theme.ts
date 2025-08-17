import { Components } from "./Components";
import { RecursivePartial } from "./RecursivePartial";

export type Theme = RecursivePartial<{
    primary: string;
    secondary: string;
    contrast: string;
    background: string;
    text: string;
    textLight: string;
    border: string;

    components: Components;
}>;