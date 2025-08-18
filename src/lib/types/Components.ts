import { RecursivePartial } from "./RecursivePartial";

export type Components = RecursivePartial<{
    chatButton: {
        background: string; // default is primary
        text: string; // default is contrast
    };
    message: {
        user: { 
            background: string; // default is primary
            text: string; // default is contrast
        };
        bot: {
            background: string; // default is secondary
            text: string; // default is text
            avatar: {
                background: string; // default is primary
                text: string; // default is contrast
            };
        };
    };
    input: {
        background: string; // default is background
        text: string; // default is text
        placeholder: string; // default is textLight
        sendButton: {
            background: string; // default is primary
            text: string; // default is contrast
        };
    };
    footer: {
        background: string; // default is background
        text: string; // default is textLight
        avatar: {
            background: string; // default is primary
            text: string; // default is contrast
        };
    };
}>;

/**
 * For each component listed in the interface structure, you should create a CSS variable in snake case format, with the prefix "morphchat-"
 * 
 * For example, the background color of the user message should be "var(--morphchat-message-user-background)"
 * 
 * These variables will be used to style the components
 */