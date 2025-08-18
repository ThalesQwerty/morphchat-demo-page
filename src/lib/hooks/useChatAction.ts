import { TypeName } from "../bot/TypeName";
import { WidgetAction } from "../types/WidgetAction";

export function useChatAction<
    P extends Record<string, TypeName> = Record<string, never>,
    M = any
>(action: WidgetAction<P, M>) {
    return action;
}