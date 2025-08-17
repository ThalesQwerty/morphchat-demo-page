import React from "react";
import { Icon } from "../../lib/components/layout/Icon";
import styles from "./FeaturesSection.module.scss";

const features = [
    {
        title: "Real-time Chat",
        description: "Instant messaging with AI-powered responses for immediate customer support.",
        icon: "ChatCircle",
    },
    {
        title: "Multi-theme Support",
        description: "Customizable themes to match your brand identity and design preferences.",
        icon: "Palette",
    },
    {
        title: "Responsive Design",
        description: "Works seamlessly across all devices and screen sizes.",
        icon: "DeviceMobile",
    },
    {
        title: "Easy Integration",
        description: "Simple setup process with minimal code changes required.",
        icon: "Lightning",
    },
    {
        title: "Analytics Dashboard",
        description: "Track conversations and gain insights into customer interactions.",
        icon: "ChartBar",
    },
    {
        title: "24/7 Availability",
        description: "Always available to provide support when your customers need it most.",
        icon: "Clock",
    },
];

export function FeaturesSection() {
    return (
        <section id="features" className={styles.featuresSection}>
            <div className={styles.featuresContainer}>
                <h2 className={styles.featuresTitle}>
                    Key Features
                </h2>
                <div className={styles.featuresGrid}>
                    {features.map((feature, index) => (
                        <div key={index} className={styles.featureCard}>
                            <div className={styles.featureIcon}>
                                <Icon name={feature.icon as any} size={48} />
                            </div>
                            <h3 className={styles.featureTitle}>
                                {feature.title}
                            </h3>
                            <p className={styles.featureDescription}>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
