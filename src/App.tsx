// AI_GENERATED_CODE_START
// [AI Generated] Data: 16/08/2025
// Descrição: Created dummy responsive webpage with ChatWidget fixed at bottom right corner
// Gerado por: Cursor AI
// Versão: React 18.2.0, TypeScript 5.0.0
// AI_GENERATED_CODE_END

import React, { useState } from "react";
import { ChatWidget } from "./lib/components/ChatWidget";

// Theme definitions
const themes = {
    purple: {
        primaryColor: "#6366f1",
        secondaryColor: "#8b5cf6",
        backgroundColor: "#ffffff",
        textColor: "#1f2937",
        textSecondary: "#6b7280",
        messageUserBg: "#6366f1",
        messageUserText: "#ffffff",
        messageBotBg: "#f3f4f6",
        messageBotText: "#1f2937",
        inputBg: "#ffffff",
        borderColor: "#e5e7eb",
        shadowColor: "rgba(0, 0, 0, 0.1)",
    },
    blue: {
        primaryColor: "#3b82f6",
        secondaryColor: "#1d4ed8",
        backgroundColor: "#ffffff",
        textColor: "#1f2937",
        textSecondary: "#6b7280",
        messageUserBg: "#3b82f6",
        messageUserText: "#ffffff",
        messageBotBg: "#f3f4f6",
        messageBotText: "#1f2937",
        inputBg: "#ffffff",
        borderColor: "#e5e7eb",
        shadowColor: "rgba(0, 0, 0, 0.1)",
    },
    green: {
        primaryColor: "#10b981",
        secondaryColor: "#059669",
        backgroundColor: "#ffffff",
        textColor: "#1f2937",
        textSecondary: "#6b7280",
        messageUserBg: "#10b981",
        messageUserText: "#ffffff",
        messageBotBg: "#f3f4f6",
        messageBotText: "#1f2937",
        inputBg: "#ffffff",
        borderColor: "#e5e7eb",
        shadowColor: "rgba(0, 0, 0, 0.1)",
    },
    orange: {
        primaryColor: "#f59e0b",
        secondaryColor: "#d97706",
        backgroundColor: "#ffffff",
        textColor: "#1f2937",
        textSecondary: "#6b7280",
        messageUserBg: "#f59e0b",
        messageUserText: "#ffffff",
        messageBotBg: "#f3f4f6",
        messageBotText: "#1f2937",
        inputBg: "#ffffff",
        borderColor: "#e5e7eb",
        shadowColor: "rgba(0, 0, 0, 0.1)",
    },
};

export const App: React.FC = () => {
    const [currentTheme, setCurrentTheme] = useState<keyof typeof themes>("purple");

    const handleSendMessage = (message: string) => {
        console.log("Message sent:", message);
        // Here you would typically send the message to your backend
    };

    return (
        <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
            {/* Theme Switcher */}
            <div
                style={{
                    position: "fixed",
                    top: "20px",
                    right: "20px",
                    display: "flex",
                    gap: "10px",
                    zIndex: 1001,
                }}
            >
                {Object.keys(themes).map((themeName) => (
                    <button
                        key={themeName}
                        onClick={() => setCurrentTheme(themeName as keyof typeof themes)}
                        style={{
                            padding: "8px 16px",
                            border: "none",
                            borderRadius: "8px",
                            background: themes[themeName as keyof typeof themes].primaryColor,
                            color: "white",
                            cursor: "pointer",
                            fontSize: "12px",
                            fontWeight: "500",
                        }}
                    >
                        {themeName}
                    </button>
                ))}
            </div>

            {/* Header */}
            <header
                style={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    padding: "1rem 2rem",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
            >
                <nav
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        maxWidth: "1200px",
                        margin: "0 auto",
                    }}
                >
                    <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>QwertyChat Demo</div>
                    <div style={{ display: "flex", gap: "2rem" }}>
                        <a href="#home" style={{ color: "white", textDecoration: "none" }}>Home</a>
                        <a href="#features" style={{ color: "white", textDecoration: "none" }}>Features</a>
                        <a href="#about" style={{ color: "white", textDecoration: "none" }}>About</a>
                        <a href="#contact" style={{ color: "white", textDecoration: "none" }}>Contact</a>
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <section
                id="home"
                style={{
                    background: "linear-gradient(135deg, #fef3c7 0%, #e0e7ff 100%)",
                    padding: "4rem 2rem",
                    textAlign: "center",
                }}
            >
                <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                    <h1 style={{ fontSize: "3rem", marginBottom: "1rem", color: "#1f2937" }}>
                        Welcome to QwertyChat
                    </h1>
                    <p style={{ fontSize: "1.2rem", color: "#6b7280", marginBottom: "2rem" }}>
                        Experience the future of customer support with our intelligent chat widget.
                        Get instant responses and seamless communication.
                    </p>
                    <button
                        style={{
                            padding: "12px 24px",
                            background: "#6366f1",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "1rem",
                            cursor: "pointer",
                        }}
                    >
                        Get Started
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section
                id="features"
                style={{
                    padding: "4rem 2rem",
                    background: "white",
                }}
            >
                <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                    <h2 style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "3rem", color: "#1f2937" }}>
                        Key Features
                    </h2>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                            gap: "2rem",
                        }}
                    >
                        {[
                            {
                                title: "Real-time Chat",
                                description: "Instant messaging with AI-powered responses for immediate customer support.",
                                icon: "💬",
                            },
                            {
                                title: "Multi-theme Support",
                                description: "Customizable themes to match your brand identity and design preferences.",
                                icon: "🎨",
                            },
                            {
                                title: "Responsive Design",
                                description: "Works seamlessly across all devices and screen sizes.",
                                icon: "📱",
                            },
                            {
                                title: "Easy Integration",
                                description: "Simple setup process with minimal code changes required.",
                                icon: "⚡",
                            },
                            {
                                title: "Analytics Dashboard",
                                description: "Track conversations and gain insights into customer interactions.",
                                icon: "📊",
                            },
                            {
                                title: "24/7 Availability",
                                description: "Always available to provide support when your customers need it most.",
                                icon: "🕒",
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                style={{
                                    padding: "2rem",
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "12px",
                                    textAlign: "center",
                                    background: "#f9fafb",
                                }}
                            >
                                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{feature.icon}</div>
                                <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#1f2937" }}>
                                    {feature.title}
                                </h3>
                                <p style={{ color: "#6b7280", lineHeight: "1.6" }}>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section
                id="about"
                style={{
                    padding: "4rem 2rem",
                    background: "#f9fafb",
                }}
            >
                <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
                    <h2 style={{ fontSize: "2.5rem", marginBottom: "2rem", color: "#1f2937" }}>
                        About QwertyChat
                    </h2>
                    <p style={{ fontSize: "1.1rem", color: "#6b7280", lineHeight: "1.8", marginBottom: "2rem" }}>
                        QwertyChat is a modern, intelligent chat widget designed to enhance customer support
                        and improve user engagement. Built with React and TypeScript, it provides a seamless
                        communication experience with customizable themes and responsive design.
                    </p>
                    <p style={{ fontSize: "1.1rem", color: "#6b7280", lineHeight: "1.8" }}>
                        Our mission is to make customer support more accessible, efficient, and user-friendly
                        through innovative technology and thoughtful design.
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section
                id="contact"
                style={{
                    padding: "4rem 2rem",
                    background: "white",
                }}
            >
                <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
                    <h2 style={{ fontSize: "2.5rem", marginBottom: "2rem", color: "#1f2937" }}>
                        Get in Touch
                    </h2>
                    <p style={{ fontSize: "1.1rem", color: "#6b7280", marginBottom: "3rem" }}>
                        Ready to transform your customer support? Contact us to learn more about QwertyChat.
                    </p>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                            gap: "2rem",
                        }}
                    >
                        <div>
                            <h3 style={{ color: "#1f2937", marginBottom: "0.5rem" }}>Email</h3>
                            <p style={{ color: "#6b7280" }}>hello@qwertychat.com</p>
                        </div>
                        <div>
                            <h3 style={{ color: "#1f2937", marginBottom: "0.5rem" }}>Phone</h3>
                            <p style={{ color: "#6b7280" }}>+1 (555) 123-4567</p>
                        </div>
                        <div>
                            <h3 style={{ color: "#1f2937", marginBottom: "0.5rem" }}>Address</h3>
                            <p style={{ color: "#6b7280" }}>123 Chat Street, Tech City</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer
                style={{
                    background: "#1f2937",
                    color: "white",
                    padding: "2rem",
                    textAlign: "center",
                }}
            >
                <p style={{ margin: "0", color: "#9ca3af" }}>
                    © 2024 QwertyChat. All rights reserved.
                </p>
            </footer>

            {/* ChatWidget - Fixed at bottom right */}
            <ChatWidget
                theme={themes[currentTheme]}
                onSendMessage={handleSendMessage}
                logo="Q"
                title="Eloquent AI"
                introTitle="Eloquent AI responds instantly"
                introSubtitle="Ask me anything"
            />
        </div>
    );
};
