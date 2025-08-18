import React from "react";
import styles from "./UserAvatar.module.scss";

interface Profile {
    avatar?: string;
    name?: string;
}

interface UserAvatarProps {
    profile: Profile;
    variant?: "bot" | "user";
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ profile, variant = "bot" }) => {
    return (
        <div className={`${styles.avatar} ${styles[variant]}`}>
            {profile.avatar ? (
                <img src={profile.avatar} alt="Profile" className={styles.avatarImage} />
            ) : (
                profile.name ? profile.name.charAt(0).toUpperCase() : "Q"
            )}
        </div>
    );
};
