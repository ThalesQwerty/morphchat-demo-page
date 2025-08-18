import React, { useState, useMemo, useCallback } from "react";

import { ChatWidgetContainer } from "../components/page/ChatWidgetContainer";
import { FilledWidgetConfig, WidgetConfig } from "../types/WidgetConfig";
import { useTheme } from "./useTheme";
import { defaultDarkTheme, defaultLightTheme } from "../constants/defaultThemes";
import { WidgetProvider, useWidgetContext } from "./useWidgetContext";
import { Color } from "../constants/Color";
import { useMessages } from "./useMessages";
import { useSystemColorMode } from "./useSystemColorMode";

interface UseChatWidgetReturn {
    component: React.ReactElement;
    widgetFunctions?: { clearMessages: () => void; setIsWidgetOpen: (open: boolean) => void };
}

export function useChatWidget(config: WidgetConfig = {}): UseChatWidgetReturn {
    const systemTheme = useSystemColorMode();
    const resolvedMode = config.mode === "auto" ? systemTheme : (config.mode || "auto");
    
    // Manage widget state
    const [isWidgetOpen, setIsWidgetOpen] = useState(!!config.status?.isOpen);
    
    const filledConfig: FilledWidgetConfig = useMemo(() => ({
        corner: config.corner || "right",
        mode: resolvedMode,
        intro: config.intro || {
            title: "QwertyChat responds instantly",
            subtitle: "Ask me anything",
        },
        events: config.events || {},

        // Only spread config properties that are actually provided
        ...(config.prompt && { prompt: config.prompt }),
        
        // Ensure botProfile is always defined
        botProfile: {
            name: "QwertyChat",
            showAvatar: true, // Bot avatar shows by default
            ...config.botProfile,
        },

        // Ensure userProfile is always defined
        userProfile: {
            name: "You",
            showAvatar: false, // User avatar hidden by default
            ...config.userProfile,
        },

        // Override status.isOpen with local state to ensure it's always correct
        status: {
            isOnline: config.status?.isOnline ?? true,
            maintenanceMode: config.status?.maintenanceMode ?? false,
            isOpen: isWidgetOpen, // Use local state
        },

        theme: typeof config.theme === "string" ? {
            ...(resolvedMode === "light" ? defaultLightTheme : defaultDarkTheme),
            primary: config.theme ?? Color.purple,
        } : config.theme ?? defaultLightTheme,
    }), [
        config.corner,
        config.intro,
        config.events,
        config.prompt,
        config.botProfile,
        config.userProfile,
        config.status?.isOnline,
        config.status?.maintenanceMode,
        config.theme,
        resolvedMode,
        isWidgetOpen
    ]);

    const messageHook = useMessages(filledConfig);

    useTheme(filledConfig.theme);

    // Memoize setIsWidgetOpen to prevent recreation
    const stableSetIsWidgetOpen = useCallback((isOpen: boolean) => {
        setIsWidgetOpen(isOpen);
    }, [setIsWidgetOpen]);

    // Create a ref to store widget functions
    const widgetFunctionsRef = React.useRef<{ clearMessages: () => void; setIsWidgetOpen: (open: boolean) => void } | null>(null);

    // Wrapper component that provides widget functions - memoized to prevent recreation
    const WidgetWrapper = useCallback(() => {
        const { clearMessages, setIsWidgetOpen } = useWidgetContext();
        
        React.useEffect(() => {
            widgetFunctionsRef.current = { clearMessages, setIsWidgetOpen };
        }, [clearMessages, setIsWidgetOpen]);
        
        return <ChatWidgetContainer />;
    }, []);

    // Memoize the component to prevent recreation when config changes
    const component = useMemo(() => (
        <WidgetProvider key="widget-provider" value={{
            ...filledConfig,
            ...messageHook,
            setIsWidgetOpen: stableSetIsWidgetOpen,
        }}>
            <WidgetWrapper />
        </WidgetProvider>
    ), [filledConfig, messageHook, stableSetIsWidgetOpen, WidgetWrapper]);

    return {
        component,
        widgetFunctions: widgetFunctionsRef.current || undefined,
    };
}