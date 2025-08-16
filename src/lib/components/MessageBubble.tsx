// AI_GENERATED_CODE_START
// [AI Generated] Data: 16/08/2025
// Descrição: MessageBubble component for chat widget
// Gerado por: Cursor AI
// Versão: React 18.2.0, TypeScript 5.0.0
// AI_GENERATED_CODE_END

import React from "react";
import styles from "./ChatWidget.module.scss";
import { Message, Theme } from "./types";
import { MessageTimestamp } from "./MessageTimestamp";

interface MessageBubbleProps {
    message: Message;
    theme: Theme;
    showTimestamp?: boolean;
    showAuthorPhoto?: boolean;
    isInChain?: boolean;
    isFirstInChain?: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
    message,
    theme,
    showTimestamp = true,
    showAuthorPhoto = true,
    isInChain = false,
    isFirstInChain = false,
}) => {
    const isUser = message.type === "user";
    
    return (
        <div className={`${styles.message} ${styles[message.type]} ${isInChain ? styles.inChain : ''} ${isFirstInChain ? styles.firstInChain : ''}`}>
            <div className={styles.messageContent}>
                {!isUser && (
                    showAuthorPhoto ? (
                        <div
                            className={styles.messageIcon}
                            style={{
                                background: theme.primaryColor,
                            }}
                        >
                            Q
                        </div>
                    ) : (
                        <div className={styles.messageIconSpacer} />
                    )
                )}
                <div
                    className={`${styles.messageBubble} ${showTimestamp ? styles.lastInChain : ''}`}
                    style={{
                        background: isUser ? theme.messageUserBg : theme.messageBotBg,
                        color: isUser ? theme.messageUserText : theme.messageBotText,
                    }}
                >
                    {message.content}
                </div>
            </div>
            {showTimestamp && message.timestamp && message.username && (
                <MessageTimestamp
                    username={message.username}
                    timestamp={message.timestamp}
                    theme={theme}
                />
            )}
        </div>
    );
};
