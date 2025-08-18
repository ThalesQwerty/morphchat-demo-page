import React from "react";
import styles from "./Card.module.scss";

export interface CardProps {
    children: React.ReactNode;
    variant?: "default" | "elevated" | "outlined";
    size?: "small" | "medium" | "large";
    hover?: boolean;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
}

export function Card({
    children,
    variant = "default",
    size = "medium",
    hover = true,
    className = "",
    onClick,
    disabled = false
}: CardProps) {
    const cardClasses = [
        styles.card,
        styles[variant],
        styles[size],
        hover ? styles.hover : "",
        disabled ? styles.disabled : "",
        onClick ? styles.clickable : "",
        className
    ].filter(Boolean).join(" ");

    return (
        <div
            className={cardClasses}
            onClick={disabled ? undefined : onClick}
            role={onClick ? "button" : undefined}
            tabIndex={onClick && !disabled ? 0 : undefined}
            onKeyDown={onClick && !disabled ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            } : undefined}
        >
            {children}
        </div>
    );
}
