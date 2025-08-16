// AI_GENERATED_CODE_START
// [AI Generated] Data: 16/08/2025
// Descrição: MessageTimestamp component for chat widget
// Gerado por: Cursor AI
// Versão: React 18.2.0, TypeScript 5.0.0
// AI_GENERATED_CODE_END

import React from "react";
import styles from "./ChatWidget.module.scss";
import { Theme } from "./types";

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
