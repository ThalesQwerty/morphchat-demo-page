# React TypeScript Boilerplate

A simple and clean React TypeScript boilerplate for starting new projects.

## Features

- 🚀 **TypeScript First** - Full TypeScript support with strict configuration
- ⚡ **Fast Development** - Vite dev server with hot reload on localhost:3000
- 🎯 **Clean Structure** - Simple and organized project structure
- 🔧 **ESLint** - Code linting and formatting
- 💅 **Prettier** - Code formatting with 4 spaces and double quotes
- 📦 **Build Ready** - Production build configuration with Vite

## Installation

```bash
npm install
```

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
├── App.tsx          # Main App component
├── main.tsx         # React entry point
└── index.ts         # Library exports (if needed)
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