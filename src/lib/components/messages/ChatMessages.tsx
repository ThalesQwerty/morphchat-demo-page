import React, { useRef, useEffect, useCallback, useState } from "react";
import styles from "./ChatMessages.module.scss";
import { ChatIntro } from "./ChatIntro";
import { MessageBubble } from "./MessageBubble";
import { UserAvatar } from "./UserAvatar";
import { UnreadDivider } from "./UnreadDivider";
import { useWidgetContext } from "../../hooks/useWidgetContext";
import { ChainedMessage } from "../../types/Message";

interface ChatMessagesProps {
    onInputInteraction?: () => void;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ onInputInteraction }) => {
    const { messages, chainedMessages, isTyping, profile, setMessages, status } = useWidgetContext();
    
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

    const scrollToBottom = useCallback(() => {
        if (shouldAutoScroll) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [shouldAutoScroll]);

    // Mark all messages as read
    const markAllMessagesAsRead = useCallback(() => {
        const updatedMessages = messages.map(message => {
            if (message.from === "bot" && !message.read) {
                return { ...message, read: true };
            }
            return message;
        });
        setMessages(updatedMessages);
    }, [messages, setMessages]);

    // Check if user is at the bottom of the chat
    const isAtBottom = useCallback(() => {
        if (!messagesContainerRef.current) return false;
        
        const container = messagesContainerRef.current;
        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight;
        const clientHeight = container.clientHeight;
        
        // Consider "at bottom" if within 50px of the bottom
        return scrollHeight - scrollTop - clientHeight < 50;
    }, []);

    // Mark messages as read when user scrolls to bottom or interacts
    const markMessagesAsReadOnInteraction = useCallback(() => {
        if (!status?.isOpen) return;
        
        // Mark all messages as read if user is at the bottom
        if (isAtBottom()) {
            markAllMessagesAsRead();
        }
    }, [status?.isOpen, isAtBottom, markAllMessagesAsRead]);

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
        
        // Mark messages as read if at bottom
        markMessagesAsReadOnInteraction();
    }, [markMessagesAsReadOnInteraction]);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, scrollToBottom]);

    // Set up scroll listener for marking messages as read
    useEffect(() => {
        const container = messagesContainerRef.current;
        if (!container || !status?.isOpen) return;

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [handleScroll, status?.isOpen]);

    // Reset auto-scroll when new messages arrive
    useEffect(() => {
        if (isAtBottom()) {
            setShouldAutoScroll(true);
        }
    }, [messages, isAtBottom]);

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
