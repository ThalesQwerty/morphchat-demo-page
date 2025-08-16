import React from "react";
import styles from "./FloatingChatButton.module.scss";
import { Theme } from "../types";

interface FloatingChatButtonProps {
    onClick: () => void;
    theme?: Theme;
    isVisible: boolean;
}

// Default theme for the button
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

export const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({
    onClick,
    theme = defaultTheme,
    isVisible,
}) => {
    if (!isVisible) return null;

    return (
        <button
            className={styles.chatButton}
            onClick={onClick}
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
    );
};
