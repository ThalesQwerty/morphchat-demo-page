import React from "react";
import styles from "./MessageBubble.module.scss";
import { MessageTimestamp } from "./MessageTimestamp";
import { UserAvatar } from "./UserAvatar";
import { useWidgetContext } from "../../hooks/useWidgetContext";
import { ChainedMessage } from "../../types/Message";

interface MessageBubbleProps {
    message: ChainedMessage;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
    message
}) => {
    const { profile } = useWidgetContext();
    const { chain } = message;

    const isFromUser = message.from === "user";

    const showTimestamp = chain === "last" || chain === "single";
    const showAuthorPhoto = chain === "last" || chain === "single";
    const isInChain = chain !== "single";
    const isFirstInChain = chain === "first" || chain === "single";
    
    return (
        <div className={`${styles.message} ${styles[message.from]} ${isInChain ? styles.inChain : ''} ${isFirstInChain ? styles.firstInChain : ''}`}>
            <div className={styles.messageContent}>
                {!isFromUser && (
                    showAuthorPhoto ? (
                        <div className={styles.messageIcon}>
                            <UserAvatar profile={profile} />
                        </div>
                    ) : (
                        <div className={styles.messageIconSpacer} />
                    )
                )}
                <div className={styles.messageBubbleContainer}>
                    <div className={`${styles.messageBubble} ${showTimestamp ? styles.lastInChain : ''}`}>
                        {message.content}
                    </div>
                    {showTimestamp && message.timestamp && (
                        <MessageTimestamp message={message} />
                    )}
                </div>
            </div>
        </div>
    );
};
