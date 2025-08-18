import { Icon } from "../../lib/components/layout/Icon";
import { ProfileCard } from "./ProfileCard";
import styles from "./ProfileManagementSection.module.scss";

export function ProfileManagementSection() {

    return (
        <section id="profiles" className={styles.profileManagementSection}>
            <div className={styles.profileManagementContainer}>
                <h2 className={styles.profileManagementTitle}>
                    Profile Management
                </h2>
                <p className={styles.profileManagementSubtitle}>
                    Customize the names displayed in the chat widget
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
