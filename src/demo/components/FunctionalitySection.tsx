import React from "react";
import { Icon } from "../../lib/components/layout/Icon";
import { useDemoContext } from "../context/DemoContext";
import styles from "./FunctionalitySection.module.scss";

export function FunctionalitySection() {
    const { 
        chatbotPrompt, 
        setChatbotPrompt, 
        isOnline, 
        setIsOnline, 
        isMaintenanceMode, 
        setIsMaintenanceMode,
        clearSiteData
    } = useDemoContext();
    return (
        <section id="functionality" className={styles.functionalitySection}>
            <div className={styles.functionalityContainer}>
                <h2 className={styles.functionalityTitle}>
                    Chatbot Functionality
                </h2>
                <p className={styles.functionalitySubtitle}>
                    Configure the chatbot behavior and connection settings
                </p>

                {/* Chatbot Prompt Editor - Full Width */}
                <div className={styles.promptSection}>
                    <h3 className={styles.promptSectionTitle}>
                        <Icon name="ChatCircle" size={24} />
                        Chatbot Instructions
                    </h3>
                    <p className={styles.promptSectionDescription}>
                        Edit the chatbot's behavior and personality in real-time
                    </p>
                    <div className={styles.promptEditor}>
                        <textarea
                            value={chatbotPrompt}
                            onChange={(e) => setChatbotPrompt(e.target.value)}
                            placeholder="Enter chatbot instructions..."
                            className={styles.promptTextarea}
                            rows={6}
                        />
                        <div className={styles.promptInfo}>
                            <Icon name="Info" size={14} />
                            <span>Changes apply to new conversations</span>
                        </div>
                    </div>
                </div>

                {/* Status Controls - Row Layout */}
                <div className={styles.statusControlsGrid}>
                    {/* Connection Status */}
                    <div className={styles.statusControlCard}>
                        <h3 className={styles.statusControlTitle}>
                            <Icon name="PowerIcon" size={20} />
                            Connection Status
                        </h3>
                        <p className={styles.statusControlDescription}>
                            The chat only answers when the widget is online
                        </p>
                        <div className={styles.statusButtons}>
                            <button
                                onClick={() => setIsOnline(!isOnline)}
                                className={`${styles.statusButton} ${isOnline ? styles.statusButtonSelected : styles.statusButtonDefault}`}
                            >
                                <Icon name="PowerIcon" size={16} />
                                {isOnline ? 'Online' : 'Offline'}
                            </button>
                        </div>
                    </div>

                    {/* Maintenance Mode */}
                    <div className={styles.statusControlCard}>
                        <h3 className={styles.statusControlTitle}>
                            <Icon name="Wrench" size={20} />
                            Maintenance Mode
                        </h3>
                        <p className={styles.statusControlDescription}>
                            You cannot send messages when the widget is in maintenance mode
                        </p>
                        <div className={styles.maintenanceButtons}>
                            <button
                                onClick={() => setIsMaintenanceMode(!isMaintenanceMode)}
                                className={`${styles.maintenanceButton} ${isMaintenanceMode ? styles.maintenanceButtonSelected : styles.maintenanceButtonDefault}`}
                            >
                                <Icon name="Wrench" size={16} />
                                {isMaintenanceMode ? 'Maintenance Mode ON' : 'Maintenance Mode OFF'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Clear Site Data */}
                <div className={styles.clearDataSection}>
                    <h3 className={styles.clearDataTitle}>
                        <Icon name="Trash" size={20} />
                        Reset conversation
                    </h3>
                    <p className={styles.clearDataDescription}>
                        Delete all stored messages
                    </p>
                    <button
                        onClick={clearSiteData}
                        className={styles.clearDataButton}
                    >
                        <Icon name="Trash" size={16} />
                        Clear chat history
                    </button>
                </div>
            </div>
        </section>
    );
}
