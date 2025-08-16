// AI_GENERATED_CODE_START
// [AI Generated] Data: 16/08/2025
// Descrição: ChatMessages component for chat widget
// Gerado por: Cursor AI
// Versão: React 18.2.0, TypeScript 5.0.0
// AI_GENERATED_CODE_END

import React, { useRef, useEffect, useCallback, useMemo } from "react";
import styles from "./ChatWidget.module.scss";
import { Message, Theme } from "./types";
import { ChatIntro } from "./ChatIntro";
import { MessageBubble } from "./MessageBubble";

interface ChatMessagesProps {
    messages: Message[];
    logo: string;
    introTitle: string;
    introSubtitle: string;
    theme: Theme;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({
    messages,
    logo,
    introTitle,
    introSubtitle,
    theme,
}) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    // Group messages and determine which should show timestamps and author photos
    const processedMessages = useMemo(() => {
        return messages.map((message, index) => {
            const nextMessage = messages[index + 1];
            const prevMessage = messages[index - 1];
            
            // Check if this message is part of a chain (same author, within 5 minutes)
            const isInChain = prevMessage && 
                prevMessage.username === message.username &&
                prevMessage.timestamp && message.timestamp &&
                (message.timestamp.getTime() - prevMessage.timestamp.getTime()) <= 5 * 60 * 1000;
            
            const isLastInChain = !nextMessage || 
                nextMessage.username !== message.username ||
                !message.timestamp || !nextMessage.timestamp ||
                (nextMessage.timestamp.getTime() - message.timestamp.getTime()) > 5 * 60 * 1000;
            
            const shouldShowTimestamp = isLastInChain;
            const shouldShowAuthorPhoto = isLastInChain;
            const isFirstInChain = !isInChain;

            return {
                ...message,
                showTimestamp: shouldShowTimestamp,
                showAuthorPhoto: shouldShowAuthorPhoto,
                isInChain: isInChain,
                isFirstInChain: isFirstInChain
            };
        });
    }, [messages]);

    return (
        <div className={styles.chatMessages}>
            <ChatIntro
                logo={logo}
                title={introTitle}
                subtitle={introSubtitle}
                theme={theme}
            />
            
            {processedMessages.map((message) => (
                <MessageBubble
                    key={message.id}
                    message={message}
                    theme={theme}
                    showTimestamp={message.showTimestamp}
                    showAuthorPhoto={message.showAuthorPhoto}
                    isInChain={message.isInChain}
                    isFirstInChain={message.isFirstInChain}
                />
            ))}
            
            <div ref={messagesEndRef} />
        </div>
    );
};
