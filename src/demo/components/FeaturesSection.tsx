import { Icon } from "../../lib/components/layout/Icon";
import { Card } from "./Card";
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
        title: "App Functionality Integration",
        description: "Integrate your app's features and actions directly into the chat experience.",
        icon: "PuzzlePiece",
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
                        <Card key={index} variant="elevated" size="large" className={styles.featureCard}>
                            <div className={styles.featureIcon}>
                                <Icon name={feature.icon as any} size={48} />
                            </div>
                            <h3 className={styles.featureTitle}>
                                {feature.title}
                            </h3>
                            <p className={styles.featureDescription}>{feature.description}</p>
                        </Card>
                    ))}
                </div>
                {/* Mobile List Layout */}
                <div className={styles.featuresList}>
                    {features.map((feature, index) => (
                        <div key={index} className={styles.featureListItem}>
                            <div className={styles.featureListIcon}>
                                <Icon name={feature.icon as any} size={24} />
                            </div>
                            <div className={styles.featureListContent}>
                                <h3 className={styles.featureListTitle}>
                                    {feature.title}
                                </h3>
                                <p className={styles.featureListDescription}>{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
