// AI_GENERATED_CODE_START
// [AI Generated] Data: 16/08/2025
// Descrição: Updated ChatWidget to be fixed at bottom right with show/hide functionality
// Gerado por: Cursor AI
// Versão: React 18.2.0, TypeScript 5.0.0
// AI_GENERATED_CODE_END

import React, { useState, useCallback, useEffect } from "react";
import styles from "./ChatWidget.module.scss";
import { Message, Theme } from "./types";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { ChatFooter } from "./ChatFooter";

interface ChatWidgetProps {
    theme?: Theme;
    messages?: Message[];
    onSendMessage?: (message: string) => void;
    isTyping?: boolean;
    logo?: string;
    title?: string;
    introTitle?: string;
    introSubtitle?: string;
    className?: string;
}

// Default theme
const defaultTheme: Theme = {
    primaryColor: "#6366f1",
    secondaryColor: "#8b5cf6",
    backgroundColor: "#ffffff",
    textColor: "#1f2937",
    textSecondary: "#6b7280",
    messageUserBg: "#6366f1",
    messageUserText: "#ffffff",
    messageBotBg: "#f3f4f6",
    messageBotText: "#1f2937",
    inputBg: "#ffffff",
    borderColor: "#e5e7eb",
    shadowColor: "rgba(0, 0, 0, 0.1)",
};

// Demo messages
const demoMessages: Message[] = [
    {
        id: "1",
        type: "user",
        content: "Hi there, would you be able to add a driver to my car insurance, please?",
        username: "You",
        timestamp: new Date(Date.now() - 8 * 60 * 1000), // 8 minutes ago
    },
    {
        id: "2",
        type: "bot",
        content: "Of course, I can help you add a named driver to your SD&P cover, John.",
        username: "QwertyChat",
        timestamp: new Date(Date.now() - 7 * 60 * 1000), // 7 minutes ago
    },
    {
        id: "3",
        type: "bot",
        content: "Would you like to proceed now?",
        username: "QwertyChat",
        timestamp: new Date(Date.now() - 6 * 60 * 1000), // 6 minutes ago
    },
    {
        id: "4",
        type: "user",
        content: "That's great. I'm getting married and want to get this sorted before our honeymoon.",
        username: "You",
        timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    },
    {
        id: "5",
        type: "bot",
        content: "Congratulations! That's wonderful news. Let me take care of this for you right away.",
        username: "QwertyChat",
        timestamp: new Date(Date.now() - 4 * 60 * 1000), // 4 minutes ago
    },
];

// Main ChatWidget Component
export const ChatWidget: React.FC<ChatWidgetProps> = ({
    theme = defaultTheme,
    messages = demoMessages,
    onSendMessage,
    isTyping = false,
    logo = "Q",
    title = "Eloquent AI",
    introTitle = "Eloquent AI responds instantly",
    introSubtitle = "Ask me anything",
    className = "",
}) => {
    const [localMessages, setLocalMessages] = useState<Message[]>(messages);
    const [isOpen, setIsOpen] = useState(false);
    const [showButton, setShowButton] = useState(true);

    const handleSendMessage = useCallback(
        (message: string) => {
            const newMessage: Message = {
                id: Date.now().toString(),
                type: "user",
                content: message,
                username: "You",
                timestamp: new Date(),
            };
            
            setLocalMessages((prev) => [...prev, newMessage]);
            
            if (onSendMessage) {
                onSendMessage(message);
            }
        },
        [onSendMessage]
    );

    const toggleChat = () => {
        if (isOpen) {
            setIsOpen(false);
            // Hide button immediately when opening chat
            setShowButton(false);
        } else {
            setIsOpen(true);
            // Show button after a delay when closing chat
            setTimeout(() => setShowButton(true), 300);
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        // Show button after a delay when closing chat
        setTimeout(() => setShowButton(true), 300);
    };

    return (
        <div className={styles.chatWidgetContainer}>
            {/* Chat Widget */}
            <div
                className={`${styles.chatWidget} ${className} ${isOpen ? styles.open : styles.closed}`}
                style={{
                    background: theme.backgroundColor,
                    boxShadow: `0 20px 25px -5px ${theme.shadowColor}`,
                    borderColor: theme.borderColor,
                }}
            >
                <ChatHeader 
                    logo={logo} 
                    title={title} 
                    theme={theme} 
                    onClose={handleClose}
                />
                
                <ChatMessages
                    messages={localMessages}
                    logo={logo}
                    introTitle={introTitle}
                    introSubtitle={introSubtitle}
                    theme={theme}
                />
                
                <ChatInput 
                    onSendMessage={handleSendMessage} 
                    theme={theme}
                />
                <ChatFooter logo={logo} theme={theme} />
            </div>

            {/* Floating Chat Button */}
            {showButton && !isOpen && (
                <button
                    className={styles.chatButton}
                    onClick={toggleChat}
                    style={{
                        background: theme.primaryColor,
                        boxShadow: `0 4px 12px ${theme.shadowColor}`,
                    }}
                    aria-label="Open chat"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                </button>
            )}
        </div>
    );
};
