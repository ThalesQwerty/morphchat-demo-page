import React from "react";

import { ChatWidgetContainer } from "../components/page/ChatWidgetContainer";
import { FilledWidgetConfig, WidgetConfig } from "../types/WidgetConfig";
import { useTheme } from "./useTheme";
import { defaultDarkTheme, defaultLightTheme } from "../constants/defaultThemes";
import { WidgetProvider } from "./useWidgetContext";
import { Color } from "../constants/Color";
import { useMessages } from "./useMessages";
import { useSystemColorMode } from "./useSystemColorMode";

interface UseChatWidgetReturn {
    component: React.ReactElement;
}

export function useChatWidget(config: WidgetConfig = {}): UseChatWidgetReturn {
    const systemTheme = useSystemColorMode();
    const resolvedMode = config.mode === "auto" ? systemTheme : (config.mode || "auto");
    
    const filledConfig: FilledWidgetConfig = {
        corner: "right",
        mode: resolvedMode,
        intro: {
            title: "QwertyChat responds instantly",
            subtitle: "Ask me anything",
        },
        events: {},
        status: {
            isOpen: false,
            isOnline: true, // default to online
            maintenanceMode: false, // default to not in maintenance
        },

        ...config,

        theme: typeof config.theme === "string" ? {
            ...(resolvedMode === "light" ? defaultLightTheme : defaultDarkTheme),
            primary: config.theme ?? Color.purple,
        } : config.theme ?? defaultLightTheme,
        profile: {
            name: "QwertyChat",
            ...config.profile,
        },
    };

    const messageHook = useMessages(
        config.events?.onSendMessage,
        config.status?.isOnline,
        config.prompt,
        filledConfig.profile
    );

    useTheme(filledConfig.theme);

    const component = (
        <WidgetProvider value={{
            ...filledConfig,
            ...messageHook,
        }}>
            <ChatWidgetContainer />
        </WidgetProvider>
    );

    return {
        component,
    };
}