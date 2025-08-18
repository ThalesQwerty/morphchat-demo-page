import React, { useState } from "react";
import styles from "./FloatingChatButton.module.scss";
import { useWidgetContext } from "../../hooks/useWidgetContext";

interface FloatingChatButtonProps {
    onClick: () => void;
    isVisible: boolean;
}

export const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({
    onClick,
    isVisible,
}) => {
    const { corner = "right", messages = [] } = useWidgetContext();
    const [isRippling, setIsRippling] = useState(false);

    // Calculate unread messages count with proper null check
    const unreadCount = messages?.filter(message =>
        message.from === "bot" && !message.read
    ).length || 0;

    const handleClick = () => {
        setIsRippling(true);
        onClick();
        
        // Reset ripple after animation completes
        setTimeout(() => {
            setIsRippling(false);
        }, 600);
    };

    const buttonClass = `${styles.chatButton} ${corner === "left" ? styles.left : styles.right} ${isVisible ? styles.visible : styles.hidden}`;

    return (
        <button
            className={buttonClass}
            onClick={handleClick}
            aria-label="Open chat"
        >
            <div className={styles.iconContainer}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>

                {/* Unread messages badge */}
                {unreadCount > 0 && (
                    <div className={styles.unreadBadge}>
                        <span className={styles.unreadCount}>
                            {unreadCount > 99 ? "99+" : unreadCount}
                        </span>
                    </div>
                )}
            </div>

            {/* Ripple effect */}
            {isRippling && <div className={styles.ripple} />}
        </button>
    );
};
