import { useChatWidget } from "../../lib/hooks/useChatWidget";
import { useAppTheme } from "../context/ThemeContext";
import { WidgetAction } from "../../lib/types/WigetAction";

interface ChatWidgetWrapperProps {
    corner?: "left" | "right";
    isOnline?: boolean;
    isMaintenanceMode?: boolean;
    chatbotPrompt?: string;
    welcomeMessage?: string;
    actions?: WidgetAction<any>[];
}

export function ChatWidgetWrapper({ 
    corner = "right", 
    isOnline = true, 
    isMaintenanceMode = false,
    chatbotPrompt = "You are a helpful AI assistant. Give short and concise answers.",
    welcomeMessage = "Hello! I'm QwertyChat, your AI assistant. How can I help you today?",
    actions = []
}: ChatWidgetWrapperProps) {
    const { resolvedTheme, colorTheme } = useAppTheme();

    const { component: ChatWidgetComponent } = useChatWidget({
        theme: colorTheme,
        mode: resolvedTheme,
        corner,
        profile: {
            name: "QwertyChat",
        },
        intro: {
            title: "QwertyChat responds instantly",
            subtitle: "Ask me anything",
        },
        status: {
            isOnline,
            maintenanceMode: isMaintenanceMode,
        },
        prompt: {
            apiKey: import.meta.env.VITE_OPENAI_API_KEY || "",
            instructions: chatbotPrompt,
            welcomeMessage,
            model: "gpt-4o-mini" as const,
            timeout: 30000,
            actions
        },
    });

    return ChatWidgetComponent;
}
