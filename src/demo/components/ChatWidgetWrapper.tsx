import { useChatWidget } from "../../lib/hooks/useChatWidget";
import { useAppTheme } from "../context/ThemeContext";

interface ChatWidgetWrapperProps {
    corner?: "left" | "right";
    isOnline?: boolean;
    isMaintenanceMode?: boolean;
    chatbotPrompt?: string;
}

export function ChatWidgetWrapper({ 
    corner = "right", 
    isOnline = true, 
    isMaintenanceMode = false,
    chatbotPrompt = "You are a helpful AI assistant. Give short and concise answers."
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
            model: "gpt-4o-mini",
            timeout: 30000,
        },
    });

    return ChatWidgetComponent;
}
