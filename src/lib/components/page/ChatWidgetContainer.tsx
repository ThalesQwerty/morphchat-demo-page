import React, { useState } from "react";
import styles from "./ChatWidgetContainer.module.scss";
import { ChatWidget } from "../container/ChatWidget";
import { FloatingChatButton } from "./FloatingChatButton";
import { Theme } from "../types";

interface ChatWidgetContainerProps {
    theme?: Theme;
    messages?: any[];
    onSendMessage?: (message: string) => void;
    isTyping?: boolean;
    logo?: string;
    title?: string;
    introTitle?: string;
    introSubtitle?: string;
    className?: string;
}

export const ChatWidgetContainer: React.FC<ChatWidgetContainerProps> = ({
    theme,
    messages,
    onSendMessage,
    isTyping,
    logo,
    title,
    introTitle,
    introSubtitle,
    className,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showButton, setShowButton] = useState(true);

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
                    background: theme?.backgroundColor,
                    boxShadow: `0 20px 25px -5px ${theme?.shadowColor}`,
                    borderColor: theme?.borderColor,
                }}
            >
                <ChatWidget
                    theme={theme}
                    messages={messages}
                    onSendMessage={onSendMessage}
                    isTyping={isTyping}
                    logo={logo}
                    title={title}
                    introTitle={introTitle}
                    introSubtitle={introSubtitle}
                    onClose={handleClose}
                />
            </div>

            {/* Floating Chat Button */}
            <FloatingChatButton
                onClick={toggleChat}
                theme={theme}
                isVisible={showButton && !isOpen}
            />
        </div>
    );
};
