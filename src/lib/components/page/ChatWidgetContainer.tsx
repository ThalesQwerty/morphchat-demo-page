import React, { useState, useEffect, useCallback } from "react";
import styles from "./ChatWidgetContainer.module.scss";
import { ChatWidget } from "../ChatWidget";
import { FloatingChatButton } from "./FloatingChatButton";
import { useWidgetContext } from "../../hooks/useWidgetContext";

interface ChatWidgetContainerProps {
    className?: string;
}

export const ChatWidgetContainer: React.FC<ChatWidgetContainerProps> = ({
    className,
}) => {
    const {
        corner,
        events,
        status,
        setMessages,
        messages,
    } = useWidgetContext();

    // Extract event handlers
    const { onOpen, onClose, onToggle } = events || {};
    const [isOpen, setIsOpen] = useState(status?.isOpen ?? false);

    // Mark all messages as read
    const markAllMessagesAsRead = useCallback(() => {
        const updatedMessages = messages.map(message => {
            if (message.from === "bot" && !message.read) {
                return { ...message, read: true };
            }
            return message;
        });
        setMessages(updatedMessages);
    }, [messages, setMessages]);

    // Update internal state when status prop changes
    useEffect(() => {
        if (status?.isOpen !== undefined) {
            setIsOpen(status.isOpen);
        }
    }, [status?.isOpen]);

    const toggleChat = () => {
        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
        
        if (newIsOpen) {
            onOpen?.();
        } else {
            // Mark messages as read when closing (simplified approach)
            markAllMessagesAsRead();
            onClose?.();
        }
        
        onToggle?.();
    };

    const handleClose = () => {
        // Mark messages as read when closing (simplified approach)
        markAllMessagesAsRead();
        setIsOpen(false);
        onClose?.();
    };

    // Determine container class based on corner and chat state
    const containerClass = styles.chatWidgetContainer;
    const chatWidgetClass = `${styles.chatWidget} ${className} ${isOpen ? styles.open : styles.closed} ${corner === "left" ? styles.left : styles.right}`;

    return (
        <div className={containerClass}>
            {/* Chat Widget */}
            <div className={chatWidgetClass}>
                <ChatWidget onClose={handleClose} />
            </div>

            {/* Floating Chat Button */}
            <div className={styles.floatingButtonWrapper}>
                <FloatingChatButton
                    onClick={toggleChat}
                    isVisible={!isOpen}
                />
            </div>
        </div>
    );
};
