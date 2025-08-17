export interface Message {
    id: string;
    from: "user" | "bot";
    content: string;
    username?: string;
    timestamp?: Date;
    chain?: "first" | "middle" | "last" | "single";
    sent?: boolean; // defaults to false for user messages, true for bot messages
}

export type ChainedMessage = Message & {
    chain: NonNullable<Message["chain"]>;
}