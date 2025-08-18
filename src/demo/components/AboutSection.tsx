import React from "react";
import styles from "./AboutSection.module.scss";

export function AboutSection() {
    return (
        <section id="about" className={styles.aboutSection}>
            <div className={styles.aboutContainer}>
                <h2 className={styles.aboutTitle}>
                    About MorphChat
                </h2>
                <p className={styles.aboutText}>
                    MorphChat is a modern, intelligent chat widget designed to enhance customer support
                    and improve user engagement. Built with React and TypeScript, it provides a seamless
                    communication experience with customizable themes and responsive design.
                </p>
                <p className={styles.aboutText}>
                    Our mission is to make customer support more accessible, efficient, and user-friendly
                    through innovative technology and thoughtful design.
                </p>
            </div>
        </section>
    );
}
