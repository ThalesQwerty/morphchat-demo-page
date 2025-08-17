import React from "react";
import { ChatHeader } from "./container/ChatHeader";
import { ChatMessages } from "./messages/ChatMessages";
import { ChatInput } from "./container/ChatInput";
import { ChatFooter } from "./container/ChatFooter";

interface ChatWidgetProps {
    onClose?: () => void;
}

// Main ChatWidget Component
export const ChatWidget: React.FC<ChatWidgetProps> = ({
    onClose,
}) => {
    return (
        <>
            <ChatHeader onClose={onClose} />
            
            <ChatMessages />
            
            <ChatInput />
            <ChatFooter />
        </>
    );
};
