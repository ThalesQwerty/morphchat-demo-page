import React, { useState, useEffect } from "react";
import styles from "./ChatWidgetContainer.module.scss";
import { ChatWidget } from "../container/ChatWidget";
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
    } = useWidgetContext();

    // Extract event handlers
    const { onOpen, onClose, onToggle } = events || {};
    const [isOpen, setIsOpen] = useState(status?.isOpen || false);
    const [showButton, setShowButton] = useState(!status?.isOpen);

    // Update internal state when status prop changes
    useEffect(() => {
        if (status?.isOpen !== undefined) {
            setIsOpen(status.isOpen);
            setShowButton(!status.isOpen);
        }
    }, [status?.isOpen]);

    const toggleChat = () => {
        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
        
        if (newIsOpen) {
            // Hide button immediately when opening chat
            setShowButton(false);
            onOpen?.();
        } else {
            // Show button after a delay when closing chat
            setTimeout(() => setShowButton(true), 300);
            onClose?.();
        }
        
        onToggle?.();
    };

    const handleClose = () => {
        setIsOpen(false);
        // Show button after a delay when closing chat
        setTimeout(() => setShowButton(true), 300);
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
                    isVisible={showButton && !isOpen}
                />
            </div>
        </div>
    );
};
