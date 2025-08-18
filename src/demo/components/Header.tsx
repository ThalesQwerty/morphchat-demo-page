import React from "react";
import { useDemoContext } from "../context/DemoContext";
import styles from "./Header.module.scss";

export function Header() {
    const { openGithub } = useDemoContext();

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.logo}>MorphChat Demo</div>
                <div className={styles.navLinks}>
                    <a href="#home" className={styles.navLink}>Home</a>
                    <a href="#features" className={styles.navLink}>Features</a>
                    <a href="#customization" className={styles.navLink}>Customize</a>
                    <a href="#functionality" className={styles.navLink}>Functionality</a>
                    <a href="#actions" className={styles.navLink}>Actions</a>
                    <a href="#about" className={styles.navLink}>About</a>
                    <button onClick={openGithub} className={styles.githubButton}>GitHub</button>
                </div>
            </nav>
        </header>
    );
}
