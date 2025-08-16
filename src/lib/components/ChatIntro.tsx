// AI_GENERATED_CODE_START
// [AI Generated] Data: 16/08/2025
// Descrição: ChatIntro component for chat widget
// Gerado por: Cursor AI
// Versão: React 18.2.0, TypeScript 5.0.0
// AI_GENERATED_CODE_END

import React from "react";
import styles from "./ChatWidget.module.scss";
import { Theme } from "./types";

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
