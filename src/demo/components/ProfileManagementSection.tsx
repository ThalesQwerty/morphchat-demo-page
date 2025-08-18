import { Icon } from "morphchat";
import { ProfileCard } from "./ProfileCard";
import styles from "./ProfileManagementSection.module.scss";

export function ProfileManagementSection() {

    return (
        <section id="profiles" className={styles.profileManagementSection}>
            <div className={styles.profileManagementContainer}>
                <h2 className={styles.profileManagementTitle}>
                    Customize Profiles
                </h2>
                <p className={styles.profileManagementSubtitle}>
                    Customize the bot and user profiles displayed in the chat widget
                </p>

                <div className={styles.profilesGrid}>
                    <ProfileCard type="bot" />
                    <ProfileCard type="user" />
                </div>

                <div className={styles.profileInfo}>
                    <div className={styles.profileNote}>
                        <Icon name="Info" size={16} />
                        <span>
                            Changes apply immediately to new messages. Existing messages will keep their original names.
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
