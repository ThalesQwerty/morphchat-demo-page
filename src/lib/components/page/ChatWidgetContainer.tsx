import React, { useEffect, useCallback } from "react";
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
        setIsWidgetOpen,
    } = useWidgetContext();

    // Extract event handlers
    const { onOpen, onClose, onToggle } = events || {}; 

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
            setIsWidgetOpen(status.isOpen);
        }
    }, [status?.isOpen]);

    // Update context when local state changes
    useEffect(() => {
        setIsWidgetOpen(status.isOpen);
    }, [status.isOpen, setIsWidgetOpen]);

    const toggleChat = () => {
        const newIsOpen = !status.isOpen;
        setIsWidgetOpen(newIsOpen);
        
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
        setIsWidgetOpen(false);
        onClose?.();
    };

    // Determine container class based on corner and chat state
    const containerClass = styles.chatWidgetContainer;
    const chatWidgetClass = `${styles.chatWidget} ${className} ${status.isOpen ? styles.open : styles.closed} ${corner === "left" ? styles.left : styles.right}`;

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
                    isVisible={!status.isOpen}
                />
            </div>
        </div>
    );
};
