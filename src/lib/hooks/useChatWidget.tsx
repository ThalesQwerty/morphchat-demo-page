import React, { useState, useMemo } from "react";

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
    
    // Manage widget state
    const [isWidgetOpen, setIsWidgetOpen] = useState(!!config.status?.isOpen);
    
    const filledConfig: FilledWidgetConfig = useMemo(() => ({
        corner: "right",
        mode: resolvedMode,
        intro: {
            title: "QwertyChat responds instantly",
            subtitle: "Ask me anything",
        },
        events: {},

        ...config,

        // Override status.isOpen with local state to ensure it's always correct
        status: {
            isOnline: true, // default to online
            maintenanceMode: false, // default to not in maintenance
            ...config.status,
            isOpen: isWidgetOpen, // Use local state
        },

        theme: typeof config.theme === "string" ? {
            ...(resolvedMode === "light" ? defaultLightTheme : defaultDarkTheme),
            primary: config.theme ?? Color.purple,
        } : config.theme ?? defaultLightTheme,
        profile: {
            name: "QwertyChat",
            ...config.profile,
        },
    }), [
        config,
        resolvedMode,
        isWidgetOpen
    ]);

    const messageHook = useMessages(filledConfig);

    useTheme(filledConfig.theme);

    const component = (
        <WidgetProvider value={{
            ...filledConfig,
            ...messageHook,
            setIsWidgetOpen,
        }}>
            <ChatWidgetContainer />
        </WidgetProvider>
    );

    return {
        component,
    };
}