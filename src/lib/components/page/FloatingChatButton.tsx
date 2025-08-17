import React from "react";
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
    const { corner = "right" } = useWidgetContext();
    if (!isVisible) return null;

    const buttonClass = `${styles.chatButton} ${corner === "left" ? styles.left : styles.right}`;

    return (
        <button
            className={buttonClass}
            onClick={onClick}
            aria-label="Open chat"
        >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
        </button>
    );
};
