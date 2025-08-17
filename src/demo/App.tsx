import React from "react";
import { Color } from "../lib/constants/Color";
import { ThemeProvider, useAppTheme } from "./context/ThemeContext";
import { ThemeToggle } from "./components/ThemeToggle";
import { ChatWidgetWrapper } from "./components/ChatWidgetWrapper";
import "./globals.scss";
import styles from "./App.module.scss";

function AppContent() {
    const { colorTheme, setColorTheme } = useAppTheme();

    return (
        <div className={styles.appContainer}>

            {/* Header */}
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <div className={styles.logo}>QwertyChat Demo</div>
                    <div className={styles.navLinks}>
                        <a href="#home" className={styles.navLink}>Home</a>
                        <a href="#features" className={styles.navLink}>Features</a>
                        <a href="#customization" className={styles.navLink}>Customize</a>
                        <a href="#about" className={styles.navLink}>About</a>
                        <a href="#contact" className={styles.navLink}>Contact</a>
                        <ThemeToggle />
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <section id="home" className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        Welcome to QwertyChat
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Experience the future of customer support with our intelligent chat widget.
                        Get instant responses and seamless communication.
                    </p>
                    <button className={styles.ctaButton}>
                        Get Started
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className={styles.featuresSection}>
                <div className={styles.featuresContainer}>
                    <h2 className={styles.featuresTitle}>
                        Key Features
                    </h2>
                    <div className={styles.featuresGrid}>
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
                            <div key={index} className={styles.featureCard}>
                                <div className={styles.featureIcon}>{feature.icon}</div>
                                <h3 className={styles.featureTitle}>
                                    {feature.title}
                                </h3>
                                <p className={styles.featureDescription}>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Customization Section */}
            <section id="customization" className={styles.customizationSection}>
                <div className={styles.customizationContainer}>
                    <h2 className={styles.customizationTitle}>
                        Customize Your Theme
                    </h2>
                    <p className={styles.customizationSubtitle}>
                        Choose from our beautiful color palette to match your brand
                    </p>
                    
                    <div className={styles.colorGrid}>
                        {Object.keys(Color)
                            .filter(colorName => !colorName.startsWith('gray') && colorName !== 'white' && colorName !== 'black')
                            .map((colorName) => (
                                <button
                                    key={colorName}
                                    onClick={() => setColorTheme(Color[colorName as keyof typeof Color])}
                                    className={`${styles.colorButton} ${colorTheme === Color[colorName as keyof typeof Color] ? styles.colorButtonSelected : styles.colorButtonDefault}`}
                                    style={{ background: Color[colorName as keyof typeof Color] }}
                                    title={colorName}
                                >
                                    {colorTheme === Color[colorName as keyof typeof Color] && (
                                        <div className={styles.checkmark}>
                                            ✓
                                        </div>
                                    )}
                                </button>
                            ))}
                    </div>
                    
                    <div className={styles.currentTheme}>
                        <p>
                            Current theme: <strong>{Object.keys(Color).find(key => Color[key as keyof typeof Color] === colorTheme)}</strong>
                        </p>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className={styles.aboutSection}>
                <div className={styles.aboutContainer}>
                    <h2 className={styles.aboutTitle}>
                        About QwertyChat
                    </h2>
                    <p className={styles.aboutText}>
                        QwertyChat is a modern, intelligent chat widget designed to enhance customer support
                        and improve user engagement. Built with React and TypeScript, it provides a seamless
                        communication experience with customizable themes and responsive design.
                    </p>
                    <p className={styles.aboutText}>
                        Our mission is to make customer support more accessible, efficient, and user-friendly
                        through innovative technology and thoughtful design.
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className={styles.contactSection}>
                <div className={styles.contactContainer}>
                    <h2 className={styles.contactTitle}>
                        Get in Touch
                    </h2>
                    <p className={styles.contactSubtitle}>
                        Ready to transform your customer support? Contact us to learn more about QwertyChat.
                    </p>
                    <div className={styles.contactGrid}>
                        <div className={styles.contactItem}>
                            <h3>Email</h3>
                            <p>hello@qwertychat.com</p>
                        </div>
                        <div className={styles.contactItem}>
                            <h3>Phone</h3>
                            <p>+1 (555) 123-4567</p>
                        </div>
                        <div className={styles.contactItem}>
                            <h3>Address</h3>
                            <p>123 Chat Street, Tech City</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className={styles.footer}>
                <p>
                    © 2024 QwertyChat. All rights reserved.
                </p>
            </footer>

            {/* ChatWidget - Fixed at bottom right */}
            <ChatWidgetWrapper />
        </div>
    );
}

export const App: React.FC = () => {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
};
