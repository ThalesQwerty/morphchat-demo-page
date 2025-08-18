import React from "react";
import { Icon } from "../../lib/components/layout/Icon";
import { useDemoContext } from "../context/DemoContext";
import styles from "./ProfileManagementSection.module.scss";

export function ProfileManagementSection() {
    const { 
        botName, 
        setBotName, 
        botShowAvatar,
        setBotShowAvatar,
        userName, 
        setUserName,
        userShowAvatar,
        setUserShowAvatar
    } = useDemoContext();

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
                    {/* Bot Profile */}
                    <div className={styles.profileCard}>
                        <h3 className={styles.profileCardTitle}>
                            <Icon name="Robot" size={20} />
                            Bot Profile
                        </h3>
                        <p className={styles.profileCardDescription}>
                            The name that appears for the AI assistant in the chat
                        </p>
                        <div className={styles.profileInput}>
                            <input
                                type="text"
                                value={botName}
                                onChange={(e) => setBotName(e.target.value)}
                                placeholder="Enter bot name..."
                                className={styles.profileTextInput}
                            />
                            <div className={styles.profileInfo}>
                                <Icon name="Info" size={14} />
                                <span>This name appears in bot messages</span>
                            </div>
                        </div>
                        <div className={styles.avatarToggle}>
                            <label className={styles.avatarToggleLabel}>
                                <input
                                    type="checkbox"
                                    checked={botShowAvatar}
                                    onChange={(e) => setBotShowAvatar(e.target.checked)}
                                    className={styles.avatarToggleCheckbox}
                                />
                                <span className={styles.avatarToggleText}>
                                    Show bot avatar in messages
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* User Profile */}
                    <div className={styles.profileCard}>
                        <h3 className={styles.profileCardTitle}>
                            <Icon name="User" size={20} />
                            User Profile
                        </h3>
                        <p className={styles.profileCardDescription}>
                            The name that appears for your messages in the chat
                        </p>
                        <div className={styles.profileInput}>
                            <input
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="Enter your name..."
                                className={styles.profileTextInput}
                            />
                            <div className={styles.profileInfo}>
                                <Icon name="Info" size={14} />
                                <span>This name appears in your messages</span>
                            </div>
                        </div>
                        <div className={styles.avatarToggle}>
                            <label className={styles.avatarToggleLabel}>
                                <input
                                    type="checkbox"
                                    checked={userShowAvatar}
                                    onChange={(e) => setUserShowAvatar(e.target.checked)}
                                    className={styles.avatarToggleCheckbox}
                                />
                                <span className={styles.avatarToggleText}>
                                    Show user avatar in messages
                                </span>
                            </label>
                        </div>
                    </div>
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
