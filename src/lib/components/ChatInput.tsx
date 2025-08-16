// AI_GENERATED_CODE_START
// [AI Generated] Data: 16/08/2025
// Descrição: ChatInput component for chat widget
// Gerado por: Cursor AI
// Versão: React 18.2.0, TypeScript 5.0.0
// AI_GENERATED_CODE_END

import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./ChatWidget.module.scss";
import { Theme } from "./types";

interface ChatInputProps {
    onSendMessage: (message: string) => void;
    theme: Theme;
    initialValue?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, theme, initialValue = "" }) => {
    const [inputValue, setInputValue] = useState(initialValue);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const autoResize = useCallback(() => {
        if (textareaRef.current) {
            // Reset height to auto to get the correct scrollHeight
            textareaRef.current.style.height = "auto";
            
            // Calculate the new height based on content
            const scrollHeight = textareaRef.current.scrollHeight;
            const newHeight = Math.max(20, Math.min(scrollHeight, 120));
            
            // Apply the new height
            textareaRef.current.style.height = `${newHeight}px`;
        }
    }, []);



    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (inputValue.trim()) {
                    onSendMessage(inputValue.trim());
                    setInputValue("");
                    autoResize();
                }
            } else if (e.key === "Enter" && e.shiftKey) {
                autoResize();
            }
        },
        [inputValue, onSendMessage, autoResize]
    );

    const handleInput = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setInputValue(e.target.value);
            autoResize();
        },
        [autoResize]
    );

    const handleSendClick = useCallback(() => {
        if (inputValue.trim()) {
            onSendMessage(inputValue.trim());
            setInputValue("");
            autoResize();
        }
    }, [inputValue, onSendMessage, autoResize]);

    useEffect(() => {
        autoResize();
    }, [autoResize]);

    // Handle initialValue changes and auto-resize
    useEffect(() => {
        if (initialValue) {
            setInputValue(initialValue);
            // Auto-resize after setting the initial value
            setTimeout(() => {
                autoResize();
            }, 100);
        }
    }, [initialValue, autoResize]);

    return (
        <div
            className={styles.chatInput}
            style={{
                borderTopColor: theme.borderColor,
            }}
        >
            <div
                className={styles.inputContainer}
                style={{
                    borderColor: theme.borderColor,
                    background: theme.inputBg,
                }}
            >
                <textarea
                    ref={textareaRef}
                    className={styles.inputField}
                    value={inputValue}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    rows={1}
                />
                <button
                    className={styles.sendButton}
                    onClick={handleSendClick}
                    style={{
                        background: theme.primaryColor,
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = theme.secondaryColor;
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = theme.primaryColor;
                    }}
                >
                    <svg
                        className={styles.sendIcon}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M12 2L4 10h6v12h4V10h6L12 2z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};
