import React, { useState, useEffect } from "react";
import styles from "./ChatHeader.module.scss";
import { useWidgetContext } from "../../hooks/useWidgetContext";
import { TimeUnit } from "../../constants/TimeUnit";

interface ChatHeaderProps {
    onClose?: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
    onClose,
}) => {
    const { profile, status } = useWidgetContext();
    const [lastOnlineTime, setLastOnlineTime] = useState<Date | null>(null);
    
    const profileAvatar = profile?.avatar;
    const profileName = profile?.name || "QwertyChat";
    const logo = profileAvatar ? undefined : profileName.charAt(0).toUpperCase();
    const title = profileName;
    const isOnline = status?.isOnline ?? true;

    // Track when the bot goes offline
    useEffect(() => {
        if (!isOnline && lastOnlineTime === null) {
            setLastOnlineTime(new Date());
        } else if (isOnline) {
            setLastOnlineTime(null);
        }
    }, [isOnline, lastOnlineTime]);

    // Format the status text
    const getStatusText = () => {
        if (isOnline) {
            return "Online now";
        } else {
            if (lastOnlineTime) {
                const now = new Date();
                const diffInMinutes = Math.floor((now.getTime() - lastOnlineTime.getTime()) / TimeUnit.minutes);
                
                if (diffInMinutes < 1) {
                    return "Last seen a few seconds ago";
                } else if (diffInMinutes < 60) {
                    return `Last seen ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
                } else {
                    const diffInHours = Math.floor(diffInMinutes / 60);
                    return `Last seen ${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
                }
            }
            return "Offline";
        }
    };

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
            <div className={`${styles.titleRow} ${!isOnline ? styles.offline : ''}`}>
                {title}
                <div className={`${styles.statusDot} ${isOnline ? styles.online : styles.offline}`} />
            </div>
            <div className={styles.statusText}>
                {getStatusText()}
            </div>
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