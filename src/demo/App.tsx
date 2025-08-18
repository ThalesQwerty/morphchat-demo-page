import React from "react";

import "./globals.scss";
import styles from "./App.module.scss";

import { ThemeProvider, useAppTheme } from "./context/ThemeContext";
import { DemoProvider, useDemoContext } from "./context/DemoContext";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { CustomizationSection } from "./components/CustomizationSection";
import { FunctionalitySection } from "./components/FunctionalitySection";
import { ActionManagementSection } from "./components/ActionManagementSection";
import { ProfileManagementSection } from "./components/ProfileManagementSection";
import { AboutSection } from "./components/AboutSection";
import { Footer } from "./components/Footer";
import { useChatWidget } from "../lib/hooks/useChatWidget";

function AppContent() {
    const { resolvedTheme, colorTheme } = useAppTheme();

    const { 
        widgetCorner: corner, 
        isOnline, 
        isMaintenanceMode, 
        chatbotPrompt,
        introTitle,
        introSubtitle,
        botName,
        botAvatar,
        botShowAvatar,
        userName,
        userAvatar,
        userShowAvatar,
        actions,
        setWidgetFunctions
    } = useDemoContext();

        const { component: ChatWidgetComponent, widgetFunctions } = useChatWidget({
        theme: colorTheme,
        mode: resolvedTheme,
        corner,
        botProfile: {
            name: botName,
            avatar: botAvatar || undefined,
            showAvatar: botShowAvatar,
        },
        userProfile: {
            name: userName,
            avatar: userAvatar || undefined,
            showAvatar: userShowAvatar,
        },
        intro: {
            title: introTitle,
            subtitle: introSubtitle,
        },
        status: {
            isOnline,
            maintenanceMode: isMaintenanceMode,
        },
        prompt: {
            apiKey: import.meta.env.VITE_OPENAI_API_KEY || "",
            instructions: chatbotPrompt,
            welcomeMessage: "Hello! I'm MorphChat, your AI assistant. How can I help you today?",
            model: "gpt-4o-mini" as const,
            timeout: 30000,
            actions,
            localStorage: true
        },
    });

    // Connect widget functions to demo context
    React.useEffect(() => {
        if (widgetFunctions) {
            setWidgetFunctions(widgetFunctions);
        }
    }, [widgetFunctions, setWidgetFunctions]);

    return (
        <div className={styles.appContainer}>
            <Header />
            <HeroSection />
            <FeaturesSection />
            <CustomizationSection />
            <ProfileManagementSection />
            <ActionManagementSection />
            <FunctionalitySection />
            <AboutSection />
            <Footer />

            { ChatWidgetComponent }
        </div>
    );
}

export const App: React.FC = () => {
    return (
        <ThemeProvider>
            <DemoProvider>
                <AppContent />
            </DemoProvider>
        </ThemeProvider>
    );
};
