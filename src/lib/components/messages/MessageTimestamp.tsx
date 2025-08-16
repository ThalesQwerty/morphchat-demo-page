import React from "react";
import styles from "./MessageTimestamp.module.scss";
import { Theme } from "../types";

interface MessageTimestampProps {
    username: string;
    timestamp: Date;
    theme: Theme;
}

export const MessageTimestamp: React.FC<MessageTimestampProps> = ({
    username,
    timestamp,
    theme,
}) => {
    const formatTime = (date: Date): string => {
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        });
    };

    return (
        <div
            className={styles.messageTimestamp}
            style={{
                color: theme.textSecondary,
            }}
        >
            {username} - {formatTime(timestamp)}
        </div>
    );
};
