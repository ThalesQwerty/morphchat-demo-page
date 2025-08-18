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
                    Experience the future of customer support with our intelligent chat widget.
                    Get instant responses and seamless communication.
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
