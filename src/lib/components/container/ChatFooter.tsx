import React from "react";
import styles from "./ChatFooter.module.scss";
import { useWidgetContext } from "../../hooks/useWidgetContext";

export const ChatFooter: React.FC = () => {
    const { botProfile } = useWidgetContext();
    
    const profileAvatar = botProfile?.avatar;
    const profileName = botProfile?.name || "MorphChat";
    const logo = profileAvatar ? undefined : profileName.charAt(0).toUpperCase();

    return (
    <div className={styles.chatFooter}>
        <div className={styles.footerLogo}>
            {profileAvatar ? (
                <img src={profileAvatar} alt="Profile" className={styles.avatar} />
            ) : (
                logo
            )}
        </div>
        <div className={styles.footerText}>
            Powered by MorphChat
        </div>
    </div>
    );
};
