export interface Message {
    id: string;
    type: "user" | "bot";
    content: string;
    username?: string;
    timestamp?: Date;
}

export interface Theme {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
    textSecondary: string;
    messageUserBg: string;
    messageUserText: string;
    messageBotBg: string;
    messageBotText: string;
    inputBg: string;
    borderColor: string;
    shadowColor: string;
}
