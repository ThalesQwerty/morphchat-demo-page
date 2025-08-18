import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./ChatInput.module.scss";
import { useWidgetContext } from "../../hooks/useWidgetContext";
import { Icon } from "../layout/Icon";

interface ChatInputProps {
    initialValue?: string;
    onInputInteraction?: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
    initialValue = "",
    onInputInteraction
}) => {
    const { sendUserMessage, botProfile, status } = useWidgetContext();

    const [inputValue, setInputValue] = useState(initialValue);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const isMaintenanceMode = status?.maintenanceMode ?? false;
    const botName = botProfile?.name || "MorphChat";

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
        if (!text || isMaintenanceMode) return;

        sendUserMessage(text);
        setInputValue("");  
        autoResize();
    }, [inputValue, autoResize, sendUserMessage, isMaintenanceMode]);

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
            if (isMaintenanceMode) return;
            setInputValue(e.target.value);
            autoResize();
        },
        [autoResize, isMaintenanceMode]
    );

    const handleInputFocus = useCallback(() => {
        onInputInteraction?.();
    }, [onInputInteraction]);

    const handleInputClick = useCallback(() => {
        onInputInteraction?.();
    }, [onInputInteraction]);

    const handleSendButtonClick = useCallback(() => {
        onInputInteraction?.();
        handleSendClick();
    }, [onInputInteraction, handleSendClick]);

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

    if (isMaintenanceMode) {
        return (
            <div className={styles.chatInput}>
                <div className={`${styles.inputContainer} ${styles.maintenanceMode}`}>
                    <div className={styles.maintenanceMessage}>
                        <Icon name="Warning" size={16} />
                        <span>{botName} is currently under maintenance.</span>
                        <Icon name="Warning" size={16} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.chatInput}>
            <div className={styles.inputContainer}>
                <textarea
                    ref={textareaRef}
                    className={styles.inputField}
                    value={inputValue}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    onFocus={handleInputFocus}
                    onClick={handleInputClick}
                    placeholder="Type a message..."
                    rows={1}
                    disabled={isMaintenanceMode}
                />
                <button
                    className={styles.sendButton}
                    onClick={handleSendButtonClick}
                    disabled={isMaintenanceMode}
                >
                    <Icon name="ArrowUp" size={16} />
                </button>
            </div>
        </div>
    );
};
