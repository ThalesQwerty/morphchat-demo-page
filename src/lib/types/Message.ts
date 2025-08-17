export interface Message {
    id: string;
    from: "user" | "bot";
    content: string;
    username?: string;
    timestamp?: Date;
    chain?: "first" | "middle" | "last" | "single";
    read?: boolean;
    sent?: boolean;
}

export type ChainedMessage = Message & {
    chain: NonNullable<Message["chain"]>;
}