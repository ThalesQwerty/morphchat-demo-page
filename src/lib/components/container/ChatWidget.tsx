import React from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "../messages/ChatMessages";
import { ChatInput } from "./ChatInput";
import { ChatFooter } from "./ChatFooter";

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
