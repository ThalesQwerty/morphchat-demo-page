import { Message } from "../types/Message";

// Demo messages
export const demoMessages: Message[] = [
    {
        id: "1",
        from: "user",
        content: "Hi there, would you be able to add a driver to my car insurance, please?",
        username: "You",
        timestamp: new Date(Date.now() - 8 * 60 * 1000), // 8 minutes ago
        read: true,
    },
    {
        id: "2",
        from: "bot",
        content: "Of course, I can help you add a named driver to your SD&P cover, John.",
        username: "QwertyChat",
        timestamp: new Date(Date.now() - 7 * 60 * 1000), // 7 minutes ago
        read: true,
    },
    {
        id: "3",
        from: "bot",
        content: "Would you like to proceed now?",
        username: "QwertyChat",
        timestamp: new Date(Date.now() - 6 * 60 * 1000), // 6 minutes ago
        read: true,
    },
    {
        id: "4",
        from: "user",
        content: "That's great. I'm getting married and want to get this sorted before our honeymoon.",
        username: "You",
        timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        read: true,
    },
    {
        id: "5",
        from: "bot",
        content: "Congratulations! That's wonderful news. Let me take care of this for you right away.",
        username: "QwertyChat",
        timestamp: new Date(Date.now() - 4 * 60 * 1000), // 4 minutes ago
        read: false,
    },
    {
        id: "6",
        from: "bot",
        content: "I'll need some information about the additional driver. What's their full name and date of birth?",
        username: "QwertyChat",
        timestamp: new Date(Date.now() - 3 * 60 * 1000), // 3 minutes ago
        read: false,
    },
    {
        id: "7",
        from: "bot",
        content: "Also, do they have any driving convictions or claims in the last 5 years?",
        username: "QwertyChat",
        timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
        read: false,
    },
];
