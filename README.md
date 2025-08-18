# MorphChat

A modern React chat widget component with TypeScript support, featuring customizable themes, actions, and a beautiful UI.

## 📦 Download & Installation

### NPM Package

MorphChat is available as an NPM package and can be easily installed in your React project:

```bash
npm install morphchat
```

### Package Information

- **Package Name**: `morphchat`
- **Latest Version**: `1.0.3`
- **Registry**: [npmjs.com/package/morphchat](https://www.npmjs.com/package/morphchat)
- **Size**: ~32.1 kB (minified)
- **Dependencies**: React 18+, TypeScript support included

### Alternative Installation Methods

```bash
# Using Yarn
yarn add morphchat

# Using pnpm
pnpm add morphchat

# Using Bun
bun add morphchat
```

## Quick Start

```tsx
import React from 'react';
import { useChatWidget } from 'morphchat';

function App() {
  const { component: ChatWidgetContainer } = useChatWidget({
    // Your configuration here
    apiKey: 'your-openai-api-key',
    theme: {
      primaryColor: '#007bff',
      backgroundColor: '#ffffff',
    },
    actions: [
      {
        id: 'help',
        label: 'Help',
        action: () => console.log('Help clicked'),
      },
    ],
  });

  return (
    <div>
      <h1>My App</h1>
      <ChatWidgetContainer />
    </div>
  );
}
```

## Features

- 🎨 **Customizable Themes**: Easy theme customization with CSS variables
- 🤖 **AI Integration**: Built-in OpenAI integration
- ⚡ **TypeScript Support**: Full TypeScript support with type definitions
- 🎯 **Custom Actions**: Add custom actions and buttons
- 📱 **Responsive Design**: Works on all screen sizes
- 🌙 **Dark Mode**: Built-in dark mode support
- 🔧 **Flexible Configuration**: Extensive configuration options

## Configuration

### Basic Configuration

```tsx
const config = {
  apiKey: 'your-openai-api-key',
  corner: 'bottom-right', // 'bottom-left' | 'bottom-right'
  theme: {
    primaryColor: '#007bff',
    backgroundColor: '#ffffff',
    textColor: '#333333',
  },
};
```

### Advanced Configuration

```tsx
const config = {
  apiKey: 'your-openai-api-key',
  corner: 'bottom-right',
  theme: {
    primaryColor: '#007bff',
    backgroundColor: '#ffffff',
    textColor: '#333333',
    borderRadius: '12px',
    fontFamily: 'Inter, sans-serif',
  },
  actions: [
    {
      id: 'help',
      label: 'Help',
      icon: 'question-circle',
      action: () => console.log('Help clicked'),
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'gear',
      action: () => console.log('Settings clicked'),
    },
  ],
  events: {
    onOpen: () => console.log('Chat opened'),
    onClose: () => console.log('Chat closed'),
    onToggle: () => console.log('Chat toggled'),
  },
};
```

## API Reference

### useChatWidget Hook

The main hook that provides the chat widget functionality.

```tsx
const { ChatWidgetContainer, messages, sendMessage, isOpen } = useChatWidget(config);
```

#### Parameters

- `config` (WidgetConfig): Configuration object for the chat widget

#### Returns

- `ChatWidgetContainer`: React component to render the chat widget
- `messages`: Array of chat messages
- `sendMessage`: Function to send a message
- `isOpen`: Boolean indicating if the chat is open

### Types

```tsx
interface WidgetConfig {
  apiKey: string;
  corner?: Corner;
  theme?: Theme;
  actions?: WidgetAction[];
  events?: {
    onOpen?: () => void;
    onClose?: () => void;
    onToggle?: () => void;
  };
}

interface Theme {
  primaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: string;
  fontFamily?: string;
}

interface WidgetAction {
  id: string;
  label: string;
  icon?: string;
  action: () => void;
}
```

## Examples

### Custom Theme

```tsx
const customTheme = {
  primaryColor: '#ff6b6b',
  backgroundColor: '#2c3e50',
  textColor: '#ecf0f1',
  borderRadius: '20px',
  fontFamily: 'Poppins, sans-serif',
};

const { ChatWidgetContainer } = useChatWidget({
  apiKey: 'your-api-key',
  theme: customTheme,
});
```

### Custom Actions

```tsx
const actions = [
  {
    id: 'support',
    label: 'Contact Support',
    icon: 'headset',
    action: () => window.open('mailto:support@example.com'),
  },
  {
    id: 'docs',
    label: 'Documentation',
    icon: 'book',
    action: () => window.open('https://docs.example.com'),
  },
];

const { ChatWidgetContainer } = useChatWidget({
  apiKey: 'your-api-key',
  actions,
});
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

If you have any questions or need help, please open an issue on GitHub.