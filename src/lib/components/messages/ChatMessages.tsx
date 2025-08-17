import { useRef, useEffect, useCallback } from "react";
import styles from "./ChatMessages.module.scss";
import { ChatIntro } from "./ChatIntro";
import { MessageBubble } from "./MessageBubble";
import { useWidgetContext } from "../../hooks/useWidgetContext";

export const ChatMessages = () => {
    const { messages, chainedMessages } = useWidgetContext();
    
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    return (
        <div className={styles.chatMessages}>
            <ChatIntro />
            
            {chainedMessages.map((message) => (
                <MessageBubble
                    key={message.id}
                    message={message}
                />
            ))}
            
            <div ref={messagesEndRef} />
        </div>
    );
};
