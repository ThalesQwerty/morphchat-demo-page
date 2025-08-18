import styles from "./ChatIntro.module.scss";
import { useWidgetContext } from "../../hooks/useWidgetContext";

export const ChatIntro = () => {
    const { intro, botProfile } = useWidgetContext();

    const profileAvatar = botProfile?.avatar;
    const profileName = botProfile?.name || "MorphChat";
    const logo = profileAvatar ? undefined : profileName.charAt(0).toUpperCase();

    if (typeof intro !== "object" || !intro || (!("title" in intro) && !("subtitle" in intro))) {
        return <div className={styles.introMessage}>
            <>{intro}</>
        </div>;
    }

    return (
        <div className={styles.introMessage}>
            <div className={styles.introLogo}>
                {profileAvatar ? (
                    <img src={profileAvatar} alt="Profile" className={styles.avatar} />
                ) : (
                    logo
                )}
            </div>
            <div className={styles.introTitle}>
                {intro.title}
            </div>
            <div className={styles.introSubtitle}>
                {intro.subtitle}
            </div>
        </div>
    );
};
