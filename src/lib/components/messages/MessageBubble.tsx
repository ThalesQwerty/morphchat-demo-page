import React from "react";
import styles from "./MessageBubble.module.scss";
import { MessageTimestamp } from "./MessageTimestamp";
import { UserAvatar } from "./UserAvatar";
import { useWidgetContext } from "../../hooks/useWidgetContext";
import { ChainedMessage } from "../../types/Message";

interface MessageBubbleProps {
    message: ChainedMessage;
    "data-message-id"?: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
    message,
    "data-message-id": dataMessageId
}) => {
    const { botProfile, userProfile } = useWidgetContext();
    const { chain } = message;

    const isFromUser = message.from === "user";
    const isUnsent = isFromUser && !message.sent;

    const showTimestamp = chain === "last" || chain === "single";
    const showAuthorPhoto = chain === "last" || chain === "single";
    
    // Determine which profile to use and whether to show avatar
    const profile = isFromUser ? userProfile : botProfile;
    const shouldShowAvatar = showAuthorPhoto && profile.showAvatar;
    
    return (
        <div 
            className={`${styles.message} ${styles[message.from]} ${styles[message.chain]} ${isUnsent ? styles.unsent : ''}`}
            data-message-id={dataMessageId}
        >
            {!isFromUser && profile.showAvatar && (
                shouldShowAvatar ? (
                    <div className={styles.messageIcon}>
                        <UserAvatar profile={profile} variant="bot" />
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
            {isFromUser && profile.showAvatar && (
                shouldShowAvatar ? (
                    <div className={styles.messageIcon}>
                        <UserAvatar profile={profile} variant="user" />
                    </div>
                ) : (
                    <div className={styles.messageIconSpacer} />
                )
            )}
        </div>
    );
};
