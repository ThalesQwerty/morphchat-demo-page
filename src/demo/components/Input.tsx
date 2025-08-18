import React from "react";
import styles from "./Input.module.scss";

export interface InputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: "text" | "email" | "password" | "number" | "search";
    disabled?: boolean;
    className?: string;
    id?: string;
    name?: string;
    required?: boolean;
    autoFocus?: boolean;
    maxLength?: number;
    minLength?: number;
}

export function Input({
    value,
    onChange,
    placeholder = "",
    type = "text",
    disabled = false,
    className = "",
    id,
    name,
    required = false,
    autoFocus = false,
    maxLength,
    minLength
}: InputProps) {
    const inputClasses = [
        styles.input,
        disabled ? styles.disabled : "",
        className
    ].filter(Boolean).join(" ");

    return (
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className={inputClasses}
            id={id}
            name={name}
            required={required}
            autoFocus={autoFocus}
            maxLength={maxLength}
            minLength={minLength}
        />
    );
}
