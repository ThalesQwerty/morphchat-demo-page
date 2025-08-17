import { useMemo, useState, useEffect, useCallback } from "react";
import { ChainedMessage, Message } from "../types/Message";
import { TimeUnit } from "../constants/TimeUnit";
import { FilledWidgetConfig } from "../types/WidgetConfig";
import { LLM } from "../bot/LLM";

export interface MessageHook { 
    messages: Message[];
    setMessages: (messages: Message[]) => void;
    sendUserMessage: (message: string) => void;
    chainedMessages: ChainedMessage[];
    flushMessages: () => void;
    isTyping: boolean;
    markAllMessagesAsRead: () => void;
}

export function useMessages(
    config: FilledWidgetConfig,
): MessageHook {
    const { prompt, profile, events, status } = config;

    const [messages, setMessages] = useState<Message[]>(prompt?.welcomeMessage ? [
        {
            id: Date.now().toString(),
            from: "bot",
            content: prompt.welcomeMessage,
            username: profile?.name || "QwertyChat",
            timestamp: new Date(),
            read: false,
        }
    ] : []);

    const [isTyping, setIsTyping] = useState(false);

    const llm = useMemo(() => {
        if (!prompt) return null;

        return new LLM(
            prompt.apiKey,
            prompt.instructions,
            prompt.model,
            prompt.timeout
        );
    }, [prompt]);

    const sendUserMessage = useCallback((message: string) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            from: "user",
            content: message,
            username: "You",
            timestamp: new Date(),
            read: false
        };

        setMessages(previous => [...previous, newMessage]);
        events?.onSendMessage?.(message);
    }, [events]);
    
    const receiveBotMessage = useCallback((message: string) => {
        console.log("useMessages: isWidgetOpen =", status?.isOpen);
        setMessages(previous => [
            ...previous, {
                id: Date.now().toString(),
                from: "bot",
                content: message,
                username: profile?.name || "QwertyChat",
                timestamp: new Date(),
                read: status?.isOpen && !previous.some(msg => msg.from === "bot" && !msg.read),
            }
        ]);
    }, [profile, status?.isOpen]);

    function markMessagesAsSent() {
        setMessages(previous => 
            previous.map(message => ({ ...message, read: true }))
        );
    }

    function markAllMessagesAsRead() {
        setMessages(previous => 
            previous.map(message => ({ ...message, read: true }))
        );
    }

    async function flushMessages() {
        if (!messages.some(message => message.from === "user" && !message.read)) return;

        markMessagesAsSent();

        if (!llm) return;
        
        llm.messages = [
            { role: "system", content: llm.instructions },
            ...messages.map(message => ({
                role: message.from === "user" ? "user" as const : "assistant" as const,
                content: message.content
            }))
        ];

        setIsTyping(true);
        events?.onTyping?.(true);

        try {
            const response = await llm.submit();
            receiveBotMessage(response);
        } catch (error) {
            console.error("Error sending message:", error);
            receiveBotMessage("Sorry, I'm having trouble responding right now. Please try again later.");
        } finally {
            setIsTyping(false);
            events?.onTyping?.(false);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            flushMessages();
        }, 250);

        return () => clearInterval(interval);
    }, [messages]);

    const chainedMessages = useMemo(() => {
        return messages.reduce((acc, message, index) => {
            const nextMessage = messages[index + 1];
            const prevMessage = messages[index - 1];

            const maxDeltaTime = 5 * TimeUnit.minutes;
            
            const hasPrevious = prevMessage && 
                prevMessage.from === message.from &&
                prevMessage.timestamp && message.timestamp &&
                Math.abs(message.timestamp.getTime() - prevMessage.timestamp.getTime()) <= maxDeltaTime;
            
            const hasNext = nextMessage && 
                nextMessage.from === message.from &&
                message.timestamp && nextMessage.timestamp &&
                Math.abs(nextMessage.timestamp.getTime() - message.timestamp.getTime()) <= maxDeltaTime;
            
            let chain: ChainedMessage["chain"];

            if (hasPrevious && hasNext) {
                chain = "middle";
            } else if (hasPrevious && !hasNext) {
                chain = "last";
            } else if (!hasPrevious && hasNext) {
                chain = "first";
            } else {
                chain = "single";
            }

            acc.push({
                ...message,
                chain
            });

            return acc;
        }, [] as ChainedMessage[]);
    }, [messages]);

    return { 
        messages, 
        setMessages,
        sendUserMessage,
        chainedMessages,
        flushMessages,
        isTyping,
        markAllMessagesAsRead,
    };
}