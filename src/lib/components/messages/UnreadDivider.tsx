import React from "react";
import styles from "./UnreadDivider.module.scss";

interface UnreadDividerProps {
    count: number;
}

export const UnreadDivider: React.FC<UnreadDividerProps> = ({ count }) => {
    return (
        <div className={styles.unreadDivider}>
            <div className={styles.dividerLine} />
            <div className={styles.unreadText}>
                {count} unread message{count !== 1 ? "s" : ""}
            </div>
            <div className={styles.dividerLine} />
        </div>
    );
};
