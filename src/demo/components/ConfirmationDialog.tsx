import React from "react";
import { Button } from "./Button";
import { Card } from "./Card";
import { Icon, IconName } from "morphchat";
import styles from "./ConfirmationDialog.module.scss";

interface ConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: "danger";
    icon?: IconName;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = "danger",
    icon = "AlertTriangle"
}) => {
    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.backdrop} onClick={handleBackdropClick}>
            <div className={styles.dialogContainer}>
                <Card variant="elevated" size="medium" className={styles.dialog}>
                    <div className={styles.header}>
                        <div className={styles.iconContainer}>
                            <Icon name={icon as IconName} size={24} />
                        </div>
                        <h3 className={styles.title}>{title}</h3>
                    </div>
                    
                    <p className={styles.message}>{message}</p>
                    
                    <div className={styles.actions}>
                        <Button
                            variant="outline"
                            size="medium"
                            onClick={onClose}
                        >
                            {cancelText}
                        </Button>
                        <Button
                            variant={variant}
                            size="medium"
                            onClick={handleConfirm}
                        >
                            {confirmText}
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};
