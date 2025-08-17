// temporary file for context

import { ReactNode } from "react";
import { ChatModel } from "openai/resources";

import { Theme } from "./Theme";
import { Color } from "../constants/Color";


export interface WidgetConfig {
    corner?: "right" | "left"; // default is "right"
    theme?: Color | Theme;
    mode?: "light" | "dark" | "auto"; // default is "auto"
    // if intro is a ReactNode, it will be used as is
    // if intro is an object, load the default intro component with the given title and subtitle
    prompt?: {
        apiKey: string;
        welcomeMessage?: string;
        instructions?: string;
        model?: ChatModel;
        timeout?: number;
    };
    intro?: ReactNode | Partial<{
        title: string;
        subtitle: string;
    }>;
    // the avatar is a image url, if not provided use the name initials with primary background
    // if no name is provided, use "QwertyChat"
    profile?: Partial<{
        name: string;
        avatar: string;
    }>;
    events?: Partial<{
        onOpen: () => void;
        onClose: () => void;
        onToggle: () => void;
        onSendMessage: (message: string) => void;
        onTyping: (isTyping: boolean) => void;
    }>;
    status?: Partial<{
        maintenanceMode: boolean;
        isOnline: boolean;
        isOpen: boolean;
    }>;
};

export type FilledWidgetConfig = Omit<Required<WidgetConfig>, "prompt"> & {
    theme: Theme;
    profile: {
        name: string;
        avatar?: string;
    };
    status: Required<WidgetConfig["status"]>;
    prompt?: WidgetConfig["prompt"];
};