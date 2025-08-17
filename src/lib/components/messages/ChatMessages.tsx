import { useRef, useEffect, useCallback } from "react";
import styles from "./ChatMessages.module.scss";
import { ChatIntro } from "./ChatIntro";
import { MessageBubble } from "./MessageBubble";
import { UserAvatar } from "./UserAvatar";
import { useWidgetContext } from "../../hooks/useWidgetContext";

export const ChatMessages = () => {
    const { messages, chainedMessages, isTyping, profile } = useWidgetContext();
    
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, scrollToBottom]);

    return (
        <div className={styles.chatMessages}>
            <ChatIntro />
            
            {chainedMessages.map((message) => (
                <MessageBubble
                    key={message.id}
                    message={message}
                />
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
                <div className={styles.typingContainer}>
                    <div className={styles.typingContent}>
                        <div className={styles.typingIcon}>
                            <UserAvatar profile={profile} />
                        </div>
                        <div className={styles.typingBubble}>
                            <div className={styles.typingDots}>
                                <div className={styles.dot}></div>
                                <div className={styles.dot}></div>
                                <div className={styles.dot}></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            <div ref={messagesEndRef} />
        </div>
    );
};
