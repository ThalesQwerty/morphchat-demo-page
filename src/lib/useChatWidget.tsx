import React from "react";

import { ChatWidgetContainer } from "./components/page/ChatWidgetContainer";
import { FilledWidgetConfig, WidgetConfig } from "./WidgetConfig";
import { useTheme } from "./hooks/useTheme";
import { defaultLightTheme } from "./constants/defaultThemes";
import { WidgetProvider } from "./hooks/useWidgetContext";
import { Color } from "./types/Color";
import { useMessages } from "./hooks/useMessages";

interface UseChatWidgetReturn {
    component: React.ReactElement;
}

export function useChatWidget(config: WidgetConfig = {}): UseChatWidgetReturn {
    const messageHook = useMessages(
        config.messages, 
        config.events?.onSendMessage
    );
    
    const filledConfig: FilledWidgetConfig = {
        corner: "right",
        mode: "light",
        intro: {
            title: "QwertyChat responds instantly",
            subtitle: "Ask me anything",
        },
        events: {},
        status: {
            isOpen: false,
            isTyping: false,
        },

        ...config,

        theme: typeof config.theme === "string" ? {
            ...defaultLightTheme,
            primary: config.theme ?? Color.purple,
        } : config.theme ?? defaultLightTheme,
        profile: {
            name: "QwertyChat",
            ...config.profile,
        },
        messages: messageHook.messages
    };

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