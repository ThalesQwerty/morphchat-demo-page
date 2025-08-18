import { createContext, useContext, useState, ReactNode, useRef } from "react";
import { useChatAction } from "../../lib";
import { Color } from "../../lib/constants/Color";
import { useAppTheme } from "./ThemeContext";
import { WidgetAction } from "../../lib/types/WidgetAction";
import { IconName } from "../../lib/components/layout/Icon";

interface DemoContextType {
    // Widget state
    widgetCorner: "left" | "right";
    setWidgetCorner: (corner: "left" | "right") => void;
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
    setWidgetFunctions: (functions: { clearMessages: () => void; setIsWidgetOpen: (open: boolean) => void }) => void;
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

export function DemoProvider({ children }: DemoProviderProps) {
    // Get theme context
    const { setColorTheme, setTheme } = useAppTheme();
    
    // Widget state
    const [widgetCorner, setWidgetCorner] = useState<"left" | "right">("right");
    const [isOnline, setIsOnline] = useState(true);
    const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
    const [chatbotPrompt, setChatbotPrompt] = useState("You are a helpful AI assistant. Give short and concise answers.");

    // Intro state
    const [introTitle, setIntroTitle] = useState("Welcome to MorphChat");
    const [introSubtitle, setIntroSubtitle] = useState("Your AI assistant for all your needs.");

    // Profile state
    const [botName, setBotName] = useState("MorphChat");
    const [botAvatar, setBotAvatar] = useState<string | null>(null);
    const [botShowAvatar, setBotShowAvatar] = useState(true);
    const [userName, setUserName] = useState("You");
    const [userAvatar, setUserAvatar] = useState<string | null>(null);
    const [userShowAvatar, setUserShowAvatar] = useState(false);

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

    // Widget functions ref
    const widgetFunctionsRef = useRef<{ clearMessages: () => void; setIsWidgetOpen: (open: boolean) => void } | null>(null);

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

    // Set widget functions
    const setWidgetFunctions = (functions: { clearMessages: () => void; setIsWidgetOpen: (open: boolean) => void }) => {
        widgetFunctionsRef.current = functions;
    };

    // Clear site data function
    const clearSiteData = () => {
        // Clear localStorage
        localStorage.removeItem("morphchat_messages");
        
        // Close widget and clear messages if functions are available
        if (widgetFunctionsRef.current) {
            widgetFunctionsRef.current.setIsWidgetOpen(false);
            widgetFunctionsRef.current.clearMessages();
        }
        
        // Reset actions to enabled state
        setActions([changeTheme, changeColorMode, changeCorner]);
        
        // Reset other state if needed
        setWidgetCorner("right");
        setIsOnline(true);
        setIsMaintenanceMode(false);
        setChatbotPrompt("You are a helpful AI assistant. Give short and concise answers.");
        setIntroTitle("Welcome to MorphChat");
        setIntroSubtitle("Your AI assistant for all your needs.");
        
        // Reset profile names
        setBotName("MorphChat");
        setBotAvatar(null);
        setBotShowAvatar(true);
        setUserName("You");
        setUserAvatar(null);
        setUserShowAvatar(false);
    };

    // Open GitHub function
    const openGithub = () => {
        window.open("https://github.com", "_blank");
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
        setWidgetFunctions,
        openGithub,
    };

    return (
        <DemoContext.Provider value={value}>
            {children}
        </DemoContext.Provider>
    );
}
