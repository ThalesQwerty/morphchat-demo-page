import React from "react";
import styles from "./ChatFooter.module.scss";
import { Theme } from "../types";

interface ChatFooterProps {
    logo: string;
    theme: Theme;
}

export const ChatFooter: React.FC<ChatFooterProps> = ({
    logo,
    theme,
}) => (
    <div
        className={styles.chatFooter}
        style={{
            borderTopColor: theme.borderColor,
        }}
    >
        <div
            className={styles.footerLogo}
            style={{
                background: theme.primaryColor,
            }}
        >
            {logo}
        </div>
        <div
            className={styles.footerText}
            style={{
                color: theme.textSecondary,
            }}
        >
            Powered by EloquentAI
        </div>
    </div>
);
