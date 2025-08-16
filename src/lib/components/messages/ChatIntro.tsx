import React from "react";
import styles from "./ChatIntro.module.scss";
import { Theme } from "../types";

interface ChatIntroProps {
    logo: string;
    title: string;
    subtitle: string;
    theme: Theme;
}

export const ChatIntro: React.FC<ChatIntroProps> = ({
    logo,
    title,
    subtitle,
    theme,
}) => (
    <div className={styles.introMessage}>
        <div
            className={styles.introLogo}
            style={{
                background: theme.primaryColor,
            }}
        >
            {logo}
        </div>
        <div
            className={styles.introTitle}
            style={{
                color: theme.textColor,
            }}
        >
            {title}
        </div>
        <div
            className={styles.introSubtitle}
            style={{
                color: theme.textSecondary,
            }}
        >
            {subtitle}
        </div>
    </div>
);
