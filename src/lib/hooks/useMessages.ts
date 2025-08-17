import { useMemo, useState } from "react";
import { ChainedMessage, Message } from "../types/Message";
import { demoMessages } from "../constants/mock";
import { TimeUnit } from "../constants/TimeUnit";
import { FilledWidgetConfig } from "../WidgetConfig";

export interface MessageHook { 
    messages: Message[];
    setMessages: (messages: Message[]) => void;
    sendUserMessage: (message: string) => void;
    chainedMessages: ChainedMessage[];
}

export function useMessages(
    initialMessages: Message[] = demoMessages, 
    onSendMessage?: FilledWidgetConfig["events"]["onSendMessage"]
): MessageHook {
    const [messages, setMessages] = useState(initialMessages);

    function sendUserMessage(message: string) {
        const newMessage: Message = {
            id: Date.now().toString(),
            from: "user",
            content: message,
            username: "You",
            timestamp: new Date(),
        };

        setMessages(previous => [...previous, newMessage]);
        onSendMessage?.(message);
    }

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
    };
}