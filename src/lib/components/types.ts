// AI_GENERATED_CODE_START
// [AI Generated] Data: 16/08/2025
// Descrição: Shared types for chat components
// Gerado por: Cursor AI
// Versão: React 18.2.0, TypeScript 5.0.0
// AI_GENERATED_CODE_END

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
