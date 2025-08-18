import React from "react";
import { Icon } from "../../lib/components/layout/Icon";
import styles from "./Button.module.scss";

export interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "danger" | "outline";
    size?: "small" | "medium" | "large";
    disabled?: boolean;
    icon?: {
        name: string;
        size?: number;
        position?: "left" | "right";
    };
    className?: string;
    type?: "button" | "submit" | "reset";
}

export function Button({
    children,
    onClick,
    variant = "outline",
    size = "medium",
    disabled = false,
    icon,
    className = "",
    type = "button"
}: ButtonProps) {
    const buttonClasses = [
        styles.button,
        styles[variant],
        styles[size],
        disabled ? styles.disabled : "",
        className
    ].filter(Boolean).join(" ");

    const renderIcon = (iconName: string, iconSize: number, position: "left" | "right") => {
        return (
            <Icon 
                name={iconName as any} 
                size={iconSize} 
                className={styles[`icon${position.charAt(0).toUpperCase() + position.slice(1)}`]}
            />
        );
    };

    return (
        <button
            type={type}
            className={buttonClasses}
            onClick={onClick}
            disabled={disabled}
        >
            {icon && icon.position !== "right" && renderIcon(icon.name, icon.size || 16, "left")}
            <span className={styles.buttonText}>{children}</span>
            {icon && icon.position === "right" && renderIcon(icon.name, icon.size || 16, "right")}
        </button>
    );
}
