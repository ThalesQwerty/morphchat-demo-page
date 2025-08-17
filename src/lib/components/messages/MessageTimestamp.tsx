import React from "react";
import styles from "./MessageTimestamp.module.scss";
import { Message } from "../../types/Message";

interface MessageTimestampProps {
    message: Message;
}

export const MessageTimestamp: React.FC<MessageTimestampProps> = ({
    message,
}) => {
    const formatDate = (date: Date): string => {
        return date.toLocaleTimeString("en-US", { 
            hour: "2-digit", 
            minute: "2-digit",
            hour12: false 
        });
    };

    const timestampClass = `${styles.timestamp} ${message.from === "user" ? styles.userTimestamp : styles.botTimestamp}`;

    return (
        <div className={timestampClass}>
            {message.username} - {formatDate(message.timestamp ?? new Date())}
        </div>
    );
};
