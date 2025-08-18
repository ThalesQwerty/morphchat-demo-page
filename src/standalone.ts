import React from "react";
import ReactDOM from "react-dom/client";
import { useChatWidget } from "./lib/hooks/useChatWidget";
import type { WidgetConfig } from "./lib/types/WidgetConfig";

// Create a simple initialization function
export function init(config: WidgetConfig) {
    // Create container if it doesn"t exist
    let container = document.getElementById("morphchat-widget");
    if (!container) {
        container = document.createElement("div");
        container.id = "morphchat-widget";
        document.body.appendChild(container);
    }

    // Create React root
    const root = ReactDOM.createRoot(container);
    
    // Create the widget component using the hook
    const WidgetWrapper = () => {
        const { component: ChatWidget } = useChatWidget(config);
        return ChatWidget;
    };

    // Render
    root.render(React.createElement(WidgetWrapper));
}

// Make it globally available for UMD
if (typeof window !== "undefined") {
    (window as any).MorphChat = { init };
}
