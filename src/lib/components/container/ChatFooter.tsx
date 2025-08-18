import React from "react";
import styles from "./ChatFooter.module.scss";

export const ChatFooter: React.FC = () => {
    return (
        <div className={styles.chatFooter}>
            <div className={styles.footerText}>
                Powered by MorphChat
            </div>
        </div>
    );
};
