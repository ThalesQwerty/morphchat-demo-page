# MorphChat - Intelligent Chat Widget

A modern, intelligent chat widget built with React and TypeScript, featuring AI-powered responses, customizable themes, and interactive actions. MorphChat is highly customizable to seamlessly fit into your own web page and can be integrated with your application through powerful action systems. The widget is designed with CSS isolation in mind - every CSS variable starts with the `--morphchat` prefix to avoid conflicts with your host page styles.

## 🚀 Features

- 🤖 **AI-Powered Responses** - Integrated with OpenAI's GPT models for intelligent conversations
- 🎨 **Customizable Themes** - Multiple color themes and dark/light mode support
- 📱 **Responsive Design** - Works seamlessly across all devices and screen sizes
- ⚡ **Real-time Chat** - Instant messaging with typing indicators and message status
- 🎮 **Interactive Actions** - Custom actions that can modify the widget behavior
- 💾 **Local Storage** - Persistent chat history across sessions

## 🎮 Demo

This repository includes a comprehensive demo application that showcases MorphChat's full capabilities. The demo page was built using good practices such as DRY (Don't Repeat Yourself) and separation of concerns, focusing on readability and reusability of code. It allows you to control several styling and behavioral aspects of the widget in real-time:

- **🎨 Theme Customization** - Switch between different color themes and see changes instantly
- **🌓 Color Mode Toggle** - Switch between light, dark, and auto modes
- **📍 Position Control** - Move the widget between left and right corners
- **📝 Prompt Instructions** - Modify the AI's behavior instructions
- **🔄 Status Management** - Toggle online/offline status and maintenance mode
- **⚙️ Action Management** - Enable or disable specific actions

The demo demonstrates one of MorphChat's most powerful features: **self-modification through AI actions**. When users ask the chatbot to change its appearance or behavior, the AI can actually execute those changes in real-time.

## 📦 Installation & Running

```bash
# Install dependencies
npm install

# Start development server on localhost:3000
npm run dev
```

## 🔑 OpenAI API Configuration

To enable AI-powered responses, create a `.env` file in the root directory:

```env
VITE_OPENAI_API_KEY=your-openai-api-key-here
```

## 🚀 Quick Start

```tsx
import { useChatWidget } from "./lib/hooks/useChatWidget";

function App() {
    const { component: ChatWidget } = useChatWidget({
        botProfile: {
            name: "My Assistant",
        },
        prompt: {
            apiKey: import.meta.env.VITE_OPENAI_API_KEY || "",
            welcomeMessage: "Hello! How can I help you today?",
            model: "gpt-4o-mini",
        },
    });

    return (
        <div>
            <h1>My App</h1>
            {ChatWidget}
        </div>
    );
}
```

## ⚙️ Advanced Configuration

```tsx
import { useChatWidget } from "./lib/hooks/useChatWidget";
import { Color } from "./lib/constants/Color";

function App() {
    const { component: ChatWidget } = useChatWidget({
        // Widget positioning
        corner: "right", // "left" | "right"
        
        // Theme configuration
        theme: Color.purple,
        mode: "auto", // "light" | "dark" | "auto"
        
        // Profile settings
        botProfile: {
            name: "MorphChat",
            avatar: "https://example.com/avatar.png", // Optional
        },
        
        // Introduction screen
        intro: {
            title: "MorphChat responds instantly",
            subtitle: "Ask me anything",
        },
        
        // AI configuration
        prompt: {
            apiKey: import.meta.env.VITE_OPENAI_API_KEY || "",
            welcomeMessage: "Hello! I'm MorphChat, your AI assistant.",
            instructions: "You are a helpful AI assistant. Give short and concise answers.",
            model: "gpt-4o-mini",
            timeout: 30000, // 30 seconds
            localStorage: true, // Persist chat history
            actions: [], // Custom actions (see below)
        },
        
        // Status management
        status: {
            isOnline: true,
            maintenanceMode: false,
            isOpen: false,
        },
        
        // Event handlers
        events: {
            onOpen: () => console.log("Chat opened"),
            onClose: () => console.log("Chat closed"),
            onSendMessage: (message) => console.log("Message sent:", message),
        },
    });

    return (
        <div>
            <h1>My App</h1>
            {ChatWidget}
        </div>
    );
}
```

## 🎮 Custom Actions

MorphChat supports custom actions that can be triggered by the AI. This powerful feature allows you to integrate the chatbot directly with your application's functionality, enabling users to perform real actions through natural language conversations.

### Creating Actions

```tsx
import { useChatAction } from "./lib/hooks/useChatAction";
import { Color } from "./lib/constants/Color";

// Theme change action
const changeTheme = useChatAction({
    name: "change_theme",
    description: "Change the theme of the chat widget",
    parameters: {
        theme: {
            type: "string",
            enum: Object.keys(Color),
            required: true,
        },
    },
    function: (args) => {
        // Update theme logic here
        return `Theme changed to ${args.theme}`;
    },
    metadata: {
        icon: "Palette",
    },
});

// E-commerce integration example
const addToCart = useChatAction({
    name: "add_to_cart",
    description: "Add a product to the shopping cart",
    parameters: {
        productId: {
            type: "string",
            required: true,
        },
        quantity: {
            type: "number",
            required: false,
        },
    },
    function: (args) => {
        // Integrate with your shopping cart system
        cart.addItem(args.productId, args.quantity || 1);
        return `Added ${args.quantity || 1} item(s) to your cart!`;
    },
});
```

### Using Actions in Widget Configuration

```tsx
const { component: ChatWidget } = useChatWidget({
    prompt: {
        apiKey: import.meta.env.VITE_OPENAI_API_KEY || "",
        actions: [changeTheme, addToCart],
        // ... other prompt settings
    },
});
```

## 📄 License

ISC