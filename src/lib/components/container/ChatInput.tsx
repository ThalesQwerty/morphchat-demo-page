import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./ChatInput.module.scss";
import { useWidgetContext } from "../../hooks/useWidgetContext";

interface ChatInputProps {
    initialValue?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({ initialValue = "" }) => {
    const { sendUserMessage } = useWidgetContext();

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

    useEffect(() => {
        autoResize();
    }, [autoResize]);

    const sendMessage = useCallback(() => {
        const text = inputValue.trim();
        if (!text) return;

        sendUserMessage(text);
        setInputValue("");  
        autoResize();
    }, [inputValue, autoResize, sendUserMessage]);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            } else if (e.key === "Enter" && e.shiftKey) {
                autoResize();
            }
        },
        [inputValue, autoResize, sendMessage]
    );

    const handleSendClick = useCallback(() => {
        sendMessage();
    }, [inputValue, autoResize, sendMessage]);

    const handleInput = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setInputValue(e.target.value);
            autoResize();
        },
        [autoResize]
    );

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
        <div className={styles.chatInput}>
            <div className={styles.inputContainer}>
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
