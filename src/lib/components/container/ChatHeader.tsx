import React from "react";
import styles from "./ChatHeader.module.scss";
import { Theme } from "../types";

interface ChatHeaderProps {
    logo: string;
    title: string;
    theme: Theme;
    onClose?: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
    logo,
    title,
    theme,
    onClose,
}) => (
    <div
        className={styles.chatHeader}
        style={{
            borderBottomColor: theme.borderColor,
        }}
    >
        <div
            className={styles.logo}
            style={{
                background: theme.primaryColor,
            }}
        >
            {logo}
        </div>
        <div
            className={styles.headerTitle}
            style={{
                color: theme.textColor,
            }}
        >
            {title}
        </div>
        {onClose && (
            <button
                className={styles.closeButton}
                onClick={onClose}
                style={{
                    color: theme.textSecondary,
                }}
                aria-label="Close chat"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        )}
    </div>
);
