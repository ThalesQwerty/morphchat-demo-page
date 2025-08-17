import React from "react";
import styles from "./ContactSection.module.scss";

export function ContactSection() {
    return (
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
    );
}
