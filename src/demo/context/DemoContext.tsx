import { createContext, useContext, useState, ReactNode, useRef } from "react";
import { useChatAction, Color, Corner, IconName } from "morphchat";
import { useAppTheme } from "./ThemeContext";
import { WidgetAction } from "morphchat";

interface DemoContextType {
    // Widget state
    widgetCorner: Corner;
    setWidgetCorner: (corner: Corner) => void;
    isOnline: boolean;
    setIsOnline: (online: boolean) => void;
    isMaintenanceMode: boolean;
    setIsMaintenanceMode: (maintenance: boolean) => void;
    chatbotPrompt: string;
    setChatbotPrompt: (prompt: string) => void;

    // Intro management
    introTitle: string;
    setIntroTitle: (title: string) => void;
    introSubtitle: string;
    setIntroSubtitle: (subtitle: string) => void;

    // Profile management
    botName: string;
    setBotName: (name: string) => void;
    botAvatar: string | null;
    setBotAvatar: (avatar: string | null) => void;
    botShowAvatar: boolean;
    setBotShowAvatar: (show: boolean) => void;
    userName: string;
    setUserName: (name: string) => void;
    userAvatar: string | null;
    setUserAvatar: (avatar: string | null) => void;
    userShowAvatar: boolean;
    setUserShowAvatar: (show: boolean) => void;

    toggleAction: (actionName: string) => void;
    actions: (WidgetAction<any, { icon: IconName }>)[]
    
    // Site data management
    clearSiteData: () => void;      
    openGithub: () => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function useDemoContext() {
    const context = useContext(DemoContext);
    if (context === undefined) {
        throw new Error("useDemoContext must be used within a DemoProvider");
    }
    return context;
}

interface DemoProviderProps {
    children: ReactNode;
}

const initialValues = {
    widgetCorner: "right" as "left" | "right",
    isOnline: true,
    isMaintenanceMode: false,
    chatbotPrompt: "You are a helpful AI assistant. Give short and concise answers.",
    introTitle: "Hello! I'm your AI assistant",
    introSubtitle: "How can I help you today? Ask me anything",
    botName: "MorphChat",
    userName: "You",
    botAvatar: null,
    userAvatar: null,
    botShowAvatar: true,
    userShowAvatar: false,
};

export function DemoProvider({ children }: DemoProviderProps) {
    // Get theme context
    const { setColorTheme, setTheme } = useAppTheme();
    
    // Widget state
    const [widgetCorner, setWidgetCorner] = useState<"left" | "right">(initialValues.widgetCorner);
    const [isOnline, setIsOnline] = useState(initialValues.isOnline);
    const [isMaintenanceMode, setIsMaintenanceMode] = useState(initialValues.isMaintenanceMode);
    const [chatbotPrompt, setChatbotPrompt] = useState(initialValues.chatbotPrompt);

    // Intro state
    const [introTitle, setIntroTitle] = useState(initialValues.introTitle);
    const [introSubtitle, setIntroSubtitle] = useState(initialValues.introSubtitle);

    // Profile state
    const [botName, setBotName] = useState(initialValues.botName);
    const [botAvatar, setBotAvatar] = useState<string | null>(initialValues.botAvatar);
    const [botShowAvatar, setBotShowAvatar] = useState(initialValues.botShowAvatar);
    const [userName, setUserName] = useState(initialValues.userName);
    const [userAvatar, setUserAvatar] = useState<string | null>(initialValues.userAvatar);
    const [userShowAvatar, setUserShowAvatar] = useState(initialValues.userShowAvatar);

    // Chat actions
    const changeTheme = useChatAction({
        name: "change_theme",
        description: "Change the theme of the chat widget",
        parameters: {
            theme: {
                type: "string",
                enum: Object.keys(Color).filter(key => key !== "white" && key !== "black" && !key.startsWith("gray")),
                required: true
            }
        },
        function: (args) => {
            const newColor = Color[args.theme as keyof typeof Color];
            if (newColor) {
                setColorTheme(newColor);
                return `Theme changed to ${args.theme}`;
            }
            return `Invalid theme: ${args.theme}`;
        },
        metadata: {
            icon: "Palette" as const satisfies IconName
        }
    });

    const changeColorMode = useChatAction({
        name: "change_color_mode",
        description: "Change the color mode of the chat widget",
        parameters: {
            mode: {
                type: "string",
                enum: ["light", "dark", "auto"],
                required: true
            }
        },
        function: (args) => {
            setTheme(args.mode as "light" | "dark" | "auto");
            return `Color mode changed to ${args.mode}`;
        },
        metadata: {
            icon: "Sun" as const satisfies IconName
        }
    });

    const changeCorner = useChatAction({
        name: "change_corner",
        description: "Change the corner position of the chat widget",
        parameters: {
            corner: {
                type: "string",
                enum: ["left", "right"],
                required: true
            }
        },
        function: (args) => {
            setWidgetCorner(args.corner as "left" | "right");
            return `Widget moved to ${args.corner} corner`;
        },
        metadata: {
            icon: "ArrowsOut" as const satisfies IconName
        }
    });

    const [actions, setActions] = useState([changeTheme, changeColorMode, changeCorner]);

    // Action management functions
    const toggleAction = (actionName: string) => {
        const newActions = actions.map(action => {
            if (action.name === actionName) {
                return { ...action, disabled: !action.disabled };
            }
            return action;
        });
        setActions(newActions as any);
    };

    // Clear site data function
    const clearSiteData = () => {
        // Clear localStorage
        localStorage.removeItem("morphchat_messages");
        
        // Reset actions to enabled state
        setActions([changeTheme, changeColorMode, changeCorner]);
        
        // Reset other state if needed
        setWidgetCorner(initialValues.widgetCorner);
        setIsOnline(initialValues.isOnline);
        setIsMaintenanceMode(initialValues.isMaintenanceMode);
        setChatbotPrompt(initialValues.chatbotPrompt);
        setIntroTitle(initialValues.introTitle);
        setIntroSubtitle(initialValues.introSubtitle);
        
        // Reset profile names
        setBotName(initialValues.botName);
        setBotAvatar(initialValues.botAvatar);
        setBotShowAvatar(initialValues.botShowAvatar);
        setUserName(initialValues.userName);
        setUserAvatar(initialValues.userAvatar);
        setUserShowAvatar(initialValues.userShowAvatar);
    };

    // Open GitHub function
    const openGithub = () => {
        window.open("https://github.com/ThalesQwerty/morphchat", "_blank");
    };

    const value: DemoContextType = {
        // Widget state
        widgetCorner,
        setWidgetCorner,
        isOnline,
        setIsOnline,
        isMaintenanceMode,
        setIsMaintenanceMode,
        chatbotPrompt,
        setChatbotPrompt,
        
        // Intro management
        introTitle,
        setIntroTitle,
        introSubtitle,
        setIntroSubtitle,
        
        // Profile management
        botName,
        setBotName,
        botAvatar,
        setBotAvatar,
        botShowAvatar,
        setBotShowAvatar,
        userName,
        setUserName,
        userAvatar,
        setUserAvatar,
        userShowAvatar,
        setUserShowAvatar,
        
        toggleAction,
        actions,
        
        // Site data management
        clearSiteData,
        openGithub,
    };

    return (
        <DemoContext.Provider value={value}>
            {children}
        </DemoContext.Provider>
    );
}
