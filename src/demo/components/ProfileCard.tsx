import React, { useRef, useState } from "react";
import { Icon } from "../../lib/components/layout/Icon";
import { useDemoContext } from "../context/DemoContext";
import { convertImageToBase64, validateImageFile, getImageFileError } from "../utils/imageUtils";
import { Button } from "./Button";
import { Input } from "./Input";
import { Card } from "./Card";
import styles from "./ProfileManagementSection.module.scss";

interface ProfileCardProps {
    type: "bot" | "user";
}

export function ProfileCard({ type }: ProfileCardProps) {
    const {
        botName,
        setBotName,
        botAvatar,
        setBotAvatar,
        botShowAvatar,
        setBotShowAvatar,
        userName,
        setUserName,
        userAvatar,
        setUserAvatar,
        userShowAvatar,
        setUserShowAvatar
    } = useDemoContext();

    const isBot = type === "bot";
    const name = isBot ? botName : userName;
    const setName = isBot ? setBotName : setUserName;
    const avatar = isBot ? botAvatar : userAvatar;
    const setAvatar = isBot ? setBotAvatar : setUserAvatar;
    const showAvatar = isBot ? botShowAvatar : userShowAvatar;
    const setShowAvatar = isBot ? setBotShowAvatar : setUserShowAvatar;
    const [imageError, setImageError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const iconName = isBot ? "Robot" : "User";
    const title = isBot ? "Bot Profile" : "User Profile";
    const description = isBot 
        ? "The name that appears for the AI assistant in the chat"
        : "The name that appears for your messages in the chat";
    const namePlaceholder = isBot ? "Enter bot name..." : "Enter your name...";
    const nameInfo = isBot 
        ? "This name appears in bot messages"
        : "This name appears in your messages";
    const avatarAlt = isBot ? "Bot avatar" : "User avatar";
    const avatarToggleText = isBot 
        ? "Show bot avatar in messages"
        : "Show user avatar in messages";

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setImageError(null);

        if (!validateImageFile(file)) {
            setImageError(getImageFileError(file));
            return;
        }

        try {
            const base64 = await convertImageToBase64(file);
            setAvatar(base64);
        } catch (error) {
            setImageError('Failed to process image. Please try again.');
        }
    };

    const removeAvatar = () => {
        setAvatar(null);
        setImageError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <Card variant="default" size="large" className={styles.profileCard}>
            <h3 className={styles.profileCardTitle}>
                <Icon name={iconName} size={20} />
                {title}
            </h3>
            <p className={styles.profileCardDescription}>
                {description}
            </p>
            <div className={styles.profileInput}>
                <Input
                    value={name}
                    onChange={setName}
                    placeholder={namePlaceholder}
                />
                <div className={styles.profileInfo}>
                    <Icon name="Info" size={14} />
                    <span>{nameInfo}</span>
                </div>
            </div>
            <div className={styles.avatarSection}>
                <h4 className={styles.avatarSectionTitle}>Avatar Image</h4>
                <div className={styles.avatarUpload}>
                    <div className={styles.avatarPreview}>
                        {avatar && (
                            <img src={avatar} alt={avatarAlt} className={styles.avatarPreviewImage} />
                        )}
                    </div>
                    <div className={styles.avatarControls}>
                        <label className={styles.avatarUploadButton}>
                            <Button
                                variant="outline"
                                size="medium"
                                icon={{ name: "Upload", size: 16, position: "left" }}
                                className={styles.avatarUploadButtonContent}
                            >
                                {avatar ? 'Change Image' : 'Upload Image'}
                            </Button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className={styles.avatarFileInput}
                            />
                        </label>
                        {avatar && (
                            <Button
                                variant="danger"
                                size="medium"
                                onClick={removeAvatar}
                                icon={{ name: "Trash", size: 16, position: "left" }}
                            >
                                Remove
                            </Button>
                        )}
                    </div>
                    {imageError && (
                        <div className={styles.avatarError}>
                            {imageError}
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.avatarToggle}>
                <label className={styles.avatarToggleLabel}>
                    <input
                        type="checkbox"
                        checked={showAvatar}
                        onChange={(e) => setShowAvatar(e.target.checked)}
                        className={styles.avatarToggleCheckbox}
                    />
                    <span className={styles.avatarToggleText}>
                        {avatarToggleText}
                    </span>
                </label>
            </div>
        </Card>
    );
}
