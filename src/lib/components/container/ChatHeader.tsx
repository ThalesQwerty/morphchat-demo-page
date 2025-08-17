import React from "react";
import styles from "./ChatHeader.module.scss";
import { useWidgetContext } from "../../hooks/useWidgetContext";

interface ChatHeaderProps {
    onClose?: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
    onClose,
}) => {
    const { profile } = useWidgetContext();
    
    const profileAvatar = profile?.avatar;
    const profileName = profile?.name || "QwertyChat";
    const logo = profileAvatar ? undefined : profileName.charAt(0).toUpperCase();
    const title = profileName;

    return (
    <div className={styles.chatHeader}>
        <div className={styles.logo}>
            {profileAvatar ? (
                <img src={profileAvatar} alt={title} className={styles.avatar} />
            ) : (
                logo
            )}
        </div>
        <div className={styles.headerTitle}>
            {title}
        </div>
        {onClose && (
            <button
                className={styles.closeButton}
                onClick={onClose}
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
};
