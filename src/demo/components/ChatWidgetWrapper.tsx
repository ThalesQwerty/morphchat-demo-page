import { useChatWidget } from "../../lib/hooks/useChatWidget";
import { useAppTheme } from "../context/ThemeContext";

interface ChatWidgetWrapperProps {
    corner?: "left" | "right";
}

export function ChatWidgetWrapper({ corner = "right" }: ChatWidgetWrapperProps) {
    const { resolvedTheme, colorTheme } = useAppTheme();

    const handleSendMessage = (message: string) => {
        console.log("Message sent:", message);
        // Here you would typically send the message to your backend
    };

    const { component: ChatWidgetComponent } = useChatWidget({
        theme: colorTheme,
        mode: resolvedTheme,
        corner,
        events: {
            onSendMessage: handleSendMessage,
        },
        profile: {
            name: "QwertyChat",
        },
        intro: {
            title: "QwertyChat responds instantly",
            subtitle: "Ask me anything",
        },
    });

    return ChatWidgetComponent;
}
