# QwertyChat - Intelligent Chat Widget

A modern, intelligent chat widget built with React and TypeScript, featuring AI-powered responses and customizable themes.

## Features

- 🤖 **AI-Powered Responses** - Integrated with OpenAI's GPT models for intelligent conversations
- 🎨 **Customizable Themes** - Multiple color themes and dark/light mode support
- 📱 **Responsive Design** - Works seamlessly across all devices and screen sizes
- ⚡ **Real-time Chat** - Instant messaging with typing indicators and message status
- 🔧 **Easy Integration** - Simple setup process with minimal code changes required
- 🎯 **TypeScript First** - Full TypeScript support with strict configuration
- 💅 **Modern UI** - Clean, professional design with smooth animations

## Installation

```bash
npm install
```

## OpenAI API Configuration

To enable AI-powered responses, you need to configure your OpenAI API key:

1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a `.env` file in the root directory
3. Add your API key:

```env
VITE_OPENAI_API_KEY=your-openai-api-key-here
```

**Note:** The API key is required for the LLM functionality to work. Without it, the chat will only show demo messages.

## Development

```bash
# Start development server on localhost:3000
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Clean build directory
npm run clean

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format

# Check code formatting
npm run format:check
```

## Project Structure

```
src/
├── demo/                    # Demo application
│   ├── App.tsx             # Main demo app
│   ├── components/         # Demo-specific components
│   └── context/           # Theme context
├── lib/                    # QwertyChat library
│   ├── components/        # Chat widget components
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript type definitions
│   ├── constants/        # Constants and themes
│   └── bot/              # LLM integration
└── main.tsx              # React entry point
```

## Configuration Files

- `vite.config.ts` - Vite configuration (localhost:3000)
- `tsconfig.json` - TypeScript configuration
- `tsconfig.node.json` - TypeScript config for Vite
- `.eslintrc.js` - ESLint configuration
- `.prettierrc.json` - Prettier configuration (4 spaces, double quotes)
- `package.json` - Dependencies and scripts

## Code Style

This project uses:
- **4 spaces** for indentation
- **Double quotes** for strings
- **Semicolons** at the end of statements
- **80 characters** line width

## Getting Started

1. Clone or download this boilerplate
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open http://localhost:3000 in your browser
5. Edit `src/App.tsx` to begin development

## Development Server

The development server runs on **http://localhost:3000** with:
- Hot module replacement (HMR)
- Fast refresh for React components
- TypeScript compilation
- ESLint integration

## License

ISC