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
import { AboutSection } from "./components/AboutSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { useChatWidget } from "../lib/hooks/useChatWidget";

function AppContent() {
    const { resolvedTheme, colorTheme } = useAppTheme();

    const { 
        widgetCorner: corner, 
        isOnline, 
        isMaintenanceMode, 
        chatbotPrompt,
        actions
    } = useDemoContext();

    const { component: ChatWidgetComponent } = useChatWidget({
        theme: colorTheme,
        mode: resolvedTheme,
        corner,
        profile: {
            name: "QwertyChat",
        },
        intro: {
            title: "QwertyChat responds instantly",
            subtitle: "Ask me anything",
        },
        status: {
            isOnline,
            maintenanceMode: isMaintenanceMode,
        },
        prompt: {
            apiKey: import.meta.env.VITE_OPENAI_API_KEY || "",
            instructions: chatbotPrompt,
            welcomeMessage: "Hello! I'm QwertyChat, your AI assistant. How can I help you today?",
            model: "gpt-4o-mini" as const,
            timeout: 30000,
            actions
        },
    });
    
    return (
        <div className={styles.appContainer}>
            <Header />
            <HeroSection />
            <FeaturesSection />
            <CustomizationSection />
            <FunctionalitySection />
            <AboutSection />
            <ContactSection />
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
