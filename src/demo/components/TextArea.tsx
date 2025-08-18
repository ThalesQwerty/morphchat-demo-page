import React from "react";
import styles from "./TextArea.module.scss";

export interface TextAreaProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    rows?: number;
    disabled?: boolean;
    className?: string;
    id?: string;
    name?: string;
    required?: boolean;
    autoFocus?: boolean;
    maxLength?: number;
    minLength?: number;
    resize?: "none" | "vertical" | "horizontal" | "both";
}

export function TextArea({
    value,
    onChange,
    placeholder = "",
    rows = 4,
    disabled = false,
    className = "",
    id,
    name,
    required = false,
    autoFocus = false,
    maxLength,
    minLength,
    resize = "vertical"
}: TextAreaProps) {
    const textAreaClasses = [
        styles.textArea,
        disabled ? styles.disabled : "",
        className
    ].filter(Boolean).join(" ");

    return (
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            disabled={disabled}
            className={textAreaClasses}
            id={id}
            name={name}
            required={required}
            autoFocus={autoFocus}
            maxLength={maxLength}
            minLength={minLength}
            style={{ resize }}
        />
    );
}
