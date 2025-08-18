# MorphChat

A modern, highly customizable React chat widget component with TypeScript support, featuring OpenAI integration and seamless website integration without style conflicts.

This project was developed as a part of a role application process to [Eloquent AI](https://www.eloquentai.co/).

**🚀 [Click here to open the Live Demo](https://morphchat-55adf53d3fdf.herokuapp.com/)**

## 📄 Introduction

MorphChat is a powerful React library that provides a fully customizable chat widget for your website. Built with TypeScript and modern React patterns, it offers seamless integration with OpenAI's API while maintaining complete style isolation to prevent conflicts with your existing website design.

### Key Features

- 🤖 **OpenAI Integration**: Built-in support for GPT models with customizable prompts
- 🎯 **Custom Actions**: Execute custom functions in your page based on user messages
- 🎨 **Highly Customizable**: Extensive theming options with light/dark mode support
- 🔧 **Style Isolation**: No conflicts with your existing website styles
- 📱 **Responsive Design**: Works perfectly on all screen sizes
- 🔄 **Real-time Updates**: Live typing indicators and message synchronization
- 💾 **Local Storage**: Optional conversation persistence
- ⚡ **TypeScript Support**: Full type safety and excellent developer experience

## 🎉 Demo Website

The demo showcases MorphChat's capabilities through an interactive website that integrates the widget with real-time customization options. You can test:

#### 1. Theme Customization
Customize the widget visual appearance.

- **Primary Color**: Change the widget's main color scheme
- **Theme Mode**: Switch between light, dark, and auto modes
- **Widget Position**: Choose between different corner positions

#### 2. Profile Management
Customize the display names, avatar, and avatar visibility for both the user and the bot.
The changes are applied instantly to the widget.

#### 3. Page Actions
Enable and disable certain actions that can be triggered by sending messages to the bot.

#### 4. Bot Configuration
- **Prompt Instructions**: Set custom instructions for the AI assistant
- **Welcome Message**: Customize the bot's greeting
- **Status Management**: Control online/offline status and maintenance mode
- **Conversation Reset**: Clear chat history with localStorage persistence

### 👨‍💻 Install and run locally

To run the demo locally:

#### 1. Clone the repository
```bash
git clone https://github.com/ThalesQwerty/morphchat.git
cd morphchat
```

#### 2. Install dependencies
```bash
npm install
```

#### 3. Configure OpenAI API Key
Create a `.env` file in the root directory:
```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

**⚠️ Important**: Without this, the AI engine simply won't work. You can create your API key in the [OpenAI Platform](https://platform.openai.com/).

#### 4. Start the development server
```bash
npm run dev
```

#### 5. Open your browser**
Navigate to `http://localhost:3000` to see the demo in action.

## 🧩 Library Usage

### Installation

Install MorphChat via npm:

```bash
npm install morphchat
```

### Basic Setup 

Here's an example for a quick-start:

```tsx
import React from "react";
import { useChatWidget } from "morphchat";

// Import global styles (required for proper styling)
import "morphchat/globals.scss";

function App() {
  const { component: ChatWidget } = useChatWidget({
    prompt: {
      apiKey: "your-openai-api-key",
      instructions: "You are an e-commerce AI-powered assistant. Help users the products available in the store."
      welcomeMessage: "Hello! How can I help you today?",
      model: "gpt-4o-mini",
    },
    theme: {
      primary: "#3b82f6",
      background: "#ffffff",
      text: "#1f2937",
    },
    corner: "right",
    mode: "dark",
  });

  return (
    <div>
      <h1>My Website</h1>
      { ChatWidget }
    </div>
  );
}
```

### Advanced Configuration

```tsx
const { component: ChatWidget } = useChatWidget({
// Theme configuration
theme: {
  primary: "#8b5cf6",
  background: "#ffffff",
  text: "#1f2937",
  borderRadius: "12px",
  fontFamily: "Inter, sans-serif",
},

// Widget positioning and mode
corner: "left",
mode: "auto", // Follows system preference

// Bot and user profiles
botProfile: {
  name: "AI Assistant",
  avatar: "https://example.com/bot-avatar.png",
  showAvatar: true,
},
userProfile: {
  name: "User",
  avatar: "https://example.com/user-avatar.png",
  showAvatar: true,
},

// OpenAI configuration
prompt: {
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  welcomeMessage: "Welcome! I\"m here to help.",
  instructions: "You are a helpful assistant. Be concise and friendly.",
  model: "gpt-4o-mini",
  timeout: 30000,
  localStorage: true, // Persist conversations
},

// Custom intro
intro: {
  title: "Chat with AI",
  subtitle: "Ask me anything!",
},

// Event handlers
events: {
  onOpen: () => console.log("Chat opened"),
  onClose: () => console.log("Chat closed"),
  onSendMessage: (message) => console.log("Message sent:", message),
},

// Widget status
status: {
  isOnline: true,
  maintenanceMode: false,
  isOpen: false,
},
});
```

### Custom Actions

Define actions that the bot can trigger based on user interactions. Actions can have typed parameters that the AI can use to execute specific functions:

```tsx
const actions = [
  {
    name: "navigate",
    description: "Navigate to a specific page on the website",
    parameters: {
      page: {
        type: "string",
        description: "The page path to navigate to (e.g., \"products\", \"about\", \"contact\")",
        required: true,
      },
    },
    function: ({ page }) => {
      window.location.href = `/${page}`;
      return `Navigating to ${page} page...`;
    },
  },
  {
    name: "addToCart",
    description: "Add a product to the shopping cart",
    parameters: {
      productId: {
        type: "string",
        description: "The unique identifier of the product",
        required: true,
      },
      quantity: {
        type: "integer",
        description: "The quantity of the product to add (default: 1)",
        required: false,
      },
    },
    function: ({ productId, quantity = 1 }) => {
      // Add to cart logic here
      console.log(`Adding ${quantity} of product ${productId} to cart`);
      return `Added ${quantity} item(s) to your cart!`;
    },
  },
];

const { component: ChatWidget } = useChatWidget({
  prompt: {
    apiKey: "your-api-key",
    actions,
    // ... other config
  },
  // ...other config
});
```

## Development Proccess

Now I'll talk a bit about how I developed MorphChat.

### Technologies

- **React 18+**: Modern React with hooks and functional components
- **TypeScript**: Full type safety and excellent developer experience
- **Sass**: Advanced styling with CSS custom properties
- **Vite**: Fast development and build tooling
- **OpenAI API**: Integration with GPT models

### Project Structure

```
src/
├── lib/                    # Main library (published to npm)
│   ├── components/        # React components
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript type definitions
│   ├── constants/        # Constants and default values
│   └── index.ts          # Main export file
├── demo/                  # Demo application (not published)
│   ├── components/       # Demo-specific components
│   ├── context/          # React context providers
│   └── App.tsx           # Demo main component
└── main.tsx              # Demo entry point
```

### Development Practices

- **DRY Principle**: Reusable components and utilities
- **Separation of Concerns**: Clear separation between library and demo
- **Type Safety**: Comprehensive TypeScript interfaces
- **Code Quality**: ESLint and Prettier for consistent formatting
- **Modular Architecture**: Well-organized component structure