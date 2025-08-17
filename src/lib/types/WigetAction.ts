import { NameToType, TypeName } from "../bot/TypeName";

export interface WidgetAction<P extends Record<string, TypeName> = Record<string, never>> {
    name: string;
    description?: string;
    parameters?: {
        [K in keyof P]: {
            type: P[K];
            description?: string;
            enum?: NameToType<P[K]>[];
            required?: boolean;
        }
    }
    function: (args: {
        [K in keyof P]: NameToType<P[K]>
    }) => string | Promise<string>;
}