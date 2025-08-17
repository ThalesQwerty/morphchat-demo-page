import { TypeName } from "../bot/TypeName";
import { WidgetAction } from "../types/WigetAction";

export function useChatAction<
    P extends Record<string, TypeName> = Record<string, never>
>(action: WidgetAction<P>) {
    return action;
}