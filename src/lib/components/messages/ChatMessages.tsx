import React, { useRef, useEffect, useCallback, useState } from "react";
import styles from "./ChatMessages.module.scss";
import { ChatIntro } from "./ChatIntro";
import { MessageBubble } from "./MessageBubble";
import { UserAvatar } from "./UserAvatar";
import { UnreadDivider } from "./UnreadDivider";
import { useWidgetContext } from "../../hooks/useWidgetContext";


export const ChatMessages = () => {
    const { messages, chainedMessages, isTyping, profile, status } = useWidgetContext();
    
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

    const scrollToBottom = useCallback(() => {
        if (shouldAutoScroll) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [shouldAutoScroll]);


    // Handle scroll events to detect if user is scrolling up
    const handleScroll = useCallback(() => {
        if (!messagesContainerRef.current) return;
        
        const container = messagesContainerRef.current;
        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight;
        const clientHeight = container.clientHeight;
        
        // If user scrolls up, disable auto-scroll
        if (scrollHeight - scrollTop - clientHeight > 100) {
            setShouldAutoScroll(false);
        } else {
            setShouldAutoScroll(true);
        }
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, scrollToBottom]);

    // Set up scroll listener
    useEffect(() => {
        const container = messagesContainerRef.current;
        if (!container || !status?.isOpen) return;

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [handleScroll, status?.isOpen]);

    // Calculate unread messages for the divider
    const unreadMessages = chainedMessages.filter(message => 
        message.from === "bot" && !message.read
    );

    // Find the first unread message index
    const firstUnreadIndex = chainedMessages.findIndex(message => 
        message.from === "bot" && !message.read
    );

    return (
        <div className={styles.chatMessages} ref={messagesContainerRef}>
            <ChatIntro />
            
            {chainedMessages.map((message, index) => (
                <React.Fragment key={message.id}>
                    {/* Show unread divider before the first unread message */}
                    {index === firstUnreadIndex && unreadMessages.length > 0 && (
                        <UnreadDivider count={unreadMessages.length} />
                    )}
                    
                    <MessageBubble
                        message={message}
                        data-message-id={message.id}
                    />
                </React.Fragment>
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
