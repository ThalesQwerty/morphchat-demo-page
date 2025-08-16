import React, { useCallback } from "react";
import { ChatWidgetContainer } from "./components/page/ChatWidgetContainer";
import { Theme } from "./components/types";

interface UseChatWidgetOptions {
    theme?: Theme;
    logo?: string;
    title?: string;
    introTitle?: string;
    introSubtitle?: string;
    onSendMessage?: (message: string) => void;
}

interface UseChatWidgetReturn {
    ChatWidgetComponent: React.ReactElement;
}

export function useChatWidget(options: UseChatWidgetOptions = {}): UseChatWidgetReturn {
    const {
        theme,
        logo = "Q",
        title = "Eloquent AI",
        introTitle = "Eloquent AI responds instantly",
        introSubtitle = "Ask me anything",
        onSendMessage,
    } = options;

    const handleSendMessage = useCallback(
        (message: string) => {
            console.log("Message sent:", message);
            if (onSendMessage) {
                onSendMessage(message);
            }
        },
        [onSendMessage]
    );

    const ChatWidgetComponent = (
        <ChatWidgetContainer
            theme={theme}
            onSendMessage={handleSendMessage}
            logo={logo}
            title={title}
            introTitle={introTitle}
            introSubtitle={introSubtitle}
        />
    );

    return {
        ChatWidgetComponent,
    };
}