import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import { ChainedMessage, Message } from "../types/Message";
import { TimeUnit } from "../constants/TimeUnit";
import { FilledWidgetConfig } from "../types/WidgetConfig";
import { LLM } from "../bot/LLM";
import { useActions } from "./useActions";

const STORAGE_KEY = "qwertychat_messages";

export interface MessageHook { 
    messages: Message[];
    setMessages: (messages: Message[]) => void;
    sendUserMessage: (message: string) => void;
    chainedMessages: ChainedMessage[];
    flushMessages: () => void;
    isTyping: boolean;
    markAllMessagesAsRead: () => void;
    clearMessages: () => void;
}

export function useMessages(
    config: FilledWidgetConfig,
): MessageHook {
    const { prompt, botProfile, userProfile, events, status } = config;

    const { actions, handleToolCalls } = useActions(config);

    // Load messages from localStorage if enabled
    const loadStoredMessages = useCallback((): Message[] => {
        if (!prompt?.localStorage) return [];
        
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                // Convert timestamp strings back to Date objects
                return parsed.map((msg: any) => ({
                    ...msg,
                    timestamp: new Date(msg.timestamp)
                }));
            }
        } catch (error) {
            console.warn("Failed to load messages from localStorage:", error);
        }
        return [];
    }, [prompt?.localStorage]);

    const [messages, setMessages] = useState<Message[]>(() => loadStoredMessages());
    const welcomeMessageAddedRef = useRef(false);

    const llm = useMemo(() => {
        if (!prompt) return null;
        
        const llmInstance = new LLM(
            prompt.apiKey,
            prompt.instructions,
            prompt.model,
            prompt.timeout
        );

        return llmInstance;
    }, [prompt]);

    // Feed stored messages to LLM on mount and when localStorage is enabled
    useEffect(() => {
        if (llm && prompt?.localStorage && messages.length > 0) {
            // Clear existing messages to avoid duplicates
            llm.messages = [];
            
            messages.forEach(message => {
                if (message.from === "user") {
                    llm.messages.push({
                        role: "user",
                        content: message.content
                    });
                } else if (message.from === "bot" && message.content !== prompt.welcomeMessage) {
                    llm.messages.push({
                        role: "assistant",
                        content: message.content
                    });
                }
            });
        }
    }, [llm, prompt?.localStorage, messages.length > 0]);

    const [isTyping, setIsTyping] = useState(false);

    // Save messages to localStorage
    const saveMessagesToStorage = useCallback((messagesToSave: Message[]) => {
        if (!prompt?.localStorage) return;
        
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(messagesToSave));
        } catch (error) {
            console.warn("Failed to save messages to localStorage:", error);
        }
    }, [prompt?.localStorage]);

    // Wrapper for setMessages that also saves to localStorage
    const setMessagesWithStorage = useCallback((updater: Message[] | ((prev: Message[]) => Message[])) => {
        setMessages(prev => {
            const newMessages = typeof updater === 'function' ? updater(prev) : updater;
            saveMessagesToStorage(newMessages);
            return newMessages;
        });
    }, [saveMessagesToStorage]);
    
    const sendUserMessage = useCallback((message: string) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            from: "user",
            content: message,
            username: userProfile?.name || "You",
            timestamp: new Date(),
            sent: false
        };

        llm?.messages.push({
            role: "user",
            content: message
        });

        setMessagesWithStorage(previous => [...previous, newMessage]);
        events?.onSendMessage?.(message);
    }, [events]);
    
    const receiveBotMessage = useCallback((message: string, alreadyInLLM?: "already_in_llm") => {
        setIsTyping(false);
        setMessagesWithStorage(previous => [
            ...previous, {
                id: Date.now().toString(),
                from: "bot",
                content: message,
                username: botProfile?.name || "QwertyChat",
                timestamp: new Date(),
                read: status?.isOpen && !previous.some(msg => msg.from === "bot" && !msg.read),
            }
        ]);

        if (!alreadyInLLM) {
            llm?.messages.push({
                role: "assistant",
                content: message
            });
        }
    }, [botProfile, status?.isOpen]);

    useEffect(() => {
        if (prompt?.welcomeMessage && !welcomeMessageAddedRef.current) {
            // Only add welcome message if there are no existing messages (no localStorage or empty storage)
            if (messages.length === 0) {
                setIsTyping(false);
                setMessagesWithStorage(previous => [
                    ...previous, {
                        id: Date.now().toString(),
                        from: "bot",
                        content: prompt.welcomeMessage!,
                        username: botProfile?.name || "QwertyChat",
                        timestamp: new Date(),
                        read: status?.isOpen && !previous.some(msg => msg.from === "bot" && !msg.read),
                    }
                ]);
            }
            welcomeMessageAddedRef.current = true;
        }
    }, [prompt?.welcomeMessage, setMessagesWithStorage, messages.length]);

    function markAllMessagesAsRead() {
        setMessagesWithStorage(previous => 
            previous.map(message => ({ ...message, read: true }))
        );
    }

    function markAllMessagesAsSent() {
        setMessagesWithStorage(previous => 
            previous.map(message => ({ ...message, sent: true }))
        );
    }

    function clearMessages() {
        // Clear messages from state
        setMessagesWithStorage([]);
        
        // Reset welcome message flag to allow it to be shown again
        welcomeMessageAddedRef.current = false;
        
        // Clear LLM messages
        if (llm) {
            llm.messages = [];
        }
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

            if (response) receiveBotMessage(response, "already_in_llm");
            
            if (toolCalls?.length) {
                await handleToolCalls(toolCalls, llm);
                const { response: newResponse } = 	await llm.submit();

                if (newResponse) receiveBotMessage(newResponse, "already_in_llm");
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

    const messageHook = useMemo(() => ({ 
        messages, 
        setMessages: setMessagesWithStorage,
        sendUserMessage,
        chainedMessages,
        flushMessages,
        isTyping,
        markAllMessagesAsRead,
        clearMessages,
    }), [
        messages,
        setMessagesWithStorage,
        sendUserMessage,
        chainedMessages,
        flushMessages,
        isTyping,
        markAllMessagesAsRead,
        clearMessages,
    ]);

    return messageHook;
}