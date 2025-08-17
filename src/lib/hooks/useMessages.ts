import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import { ChainedMessage, Message } from "../types/Message";
import { TimeUnit } from "../constants/TimeUnit";
import { FilledWidgetConfig } from "../types/WidgetConfig";
import { LLM } from "../bot/LLM";
import { useActions } from "./useActions";

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

    const { actions, handleToolCalls } = useActions(config);

    const [messages, setMessages] = useState<Message[]>([]);
    const welcomeMessageAddedRef = useRef(false);

    const llm = useMemo(() => {
        if (!prompt) return null;
        
        return new LLM(
            prompt.apiKey,
            prompt.instructions,
            prompt.model,
            prompt.timeout
        );
    }, []);

    const [isTyping, setIsTyping] = useState(false);
    
    const sendUserMessage = useCallback((message: string) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            from: "user",
            content: message,
            username: "You",
            timestamp: new Date(),
            sent: false
        };

        llm?.messages.push({
            role: "user",
            content: message
        });

        setMessages(previous => [...previous, newMessage]);
        events?.onSendMessage?.(message);
    }, [events]);
    
    const receiveBotMessage = useCallback((message: string) => {
        setIsTyping(false);
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

        llm?.messages.push({
            role: "assistant",
            content: message
        });
    }, [profile, status?.isOpen]);

    useEffect(() => {
        if (prompt?.welcomeMessage && !welcomeMessageAddedRef.current) {
            // Add welcome message to UI but not to LLM conversation
            setIsTyping(false);
            setMessages(previous => [
                ...previous, {
                    id: Date.now().toString(),
                    from: "bot",
                    content: prompt.welcomeMessage!,
                    username: profile?.name || "QwertyChat",
                    timestamp: new Date(),
                    read: status?.isOpen && !previous.some(msg => msg.from === "bot" && !msg.read),
                }
            ]);
            welcomeMessageAddedRef.current = true;
        }
    }, [prompt?.welcomeMessage]);

    function markAllMessagesAsRead() {
        setMessages(previous => 
            previous.map(message => ({ ...message, read: true }))
        );
    }

    function markAllMessagesAsSent() {
        setMessages(previous => 
            previous.map(message => ({ ...message, sent: true }))
        );
    }   

    async function flushMessages() {
        if (!messages.some(message => message.from === "user" && !message.sent)) return;

        markAllMessagesAsSent();

        if (!llm) return;

        setIsTyping(true);
        events?.onTyping?.(true);

        try {
            const { response, toolCalls } = await llm.submit(actions);

            if (!response && !toolCalls) throw new Error("No response or tool calls");

            if (response) receiveBotMessage(response);
            
            if (toolCalls?.length) {
                await handleToolCalls(toolCalls, llm);
                const { response: newResponse } = 	await llm.submit();

                if (newResponse) receiveBotMessage(newResponse);
                else throw new Error("No response after tool calls");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            receiveBotMessage("Sorry, I'm having trouble responding right now. Please try again later.");
        } finally {
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