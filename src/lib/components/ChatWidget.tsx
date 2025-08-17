import React, { useCallback } from "react";
import { ChatHeader } from "./container/ChatHeader";
import { ChatMessages } from "./messages/ChatMessages";
import { ChatInput } from "./container/ChatInput";
import { ChatFooter } from "./container/ChatFooter";
import { useWidgetContext } from "../hooks/useWidgetContext";

interface ChatWidgetProps {
    onClose?: () => void;
}

// Main ChatWidget Component
export const ChatWidget: React.FC<ChatWidgetProps> = ({
    onClose,
}) => {
    const { setMessages, messages } = useWidgetContext();

    // Mark all messages as read when user interacts with input
    const handleInputInteraction = useCallback(() => {
        const updatedMessages = messages.map(message => {
            if (message.from === "bot" && !message.read) {
                return { ...message, read: true };
            }
            return message;
        });
        setMessages(updatedMessages);
    }, [messages, setMessages]);

    return (
        <>
            <ChatHeader onClose={onClose} />
            
            <ChatMessages />
            
            <ChatInput onInputInteraction={handleInputInteraction} />
            <ChatFooter />
        </>
    );
};
