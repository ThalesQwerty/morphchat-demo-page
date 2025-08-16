// AI_GENERATED_CODE_START
// [AI Generated] Data: 16/08/2025
// Descrição: ChatFooter component for chat widget
// Gerado por: Cursor AI
// Versão: React 18.2.0, TypeScript 5.0.0
// AI_GENERATED_CODE_END

import React from "react";
import styles from "./ChatWidget.module.scss";
import { Theme } from "./types";

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
