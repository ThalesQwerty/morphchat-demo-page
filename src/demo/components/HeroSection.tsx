import React from "react";
import { Button } from "./Button";
import styles from "./HeroSection.module.scss";

export function HeroSection() {
    return (
        <section id="home" className={styles.heroSection}>
            <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>
                    Welcome to MorphChat
                </h1>
                <p className={styles.heroSubtitle}>
                    Experience the future of customer support with our highly adaptive and customizable chat widget.
                    Get instant responses and seamless communication tailored to your needs.
                </p>
                <div className={styles.heroButtonContainer}>
                    <Button variant="primary" size="large">
                        Get Started
                    </Button>
                </div>
            </div>
        </section>
    );
}
