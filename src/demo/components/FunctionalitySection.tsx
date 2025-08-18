import React from "react";
import { Icon } from "../../lib/components/layout/Icon";
import { useDemoContext } from "../context/DemoContext";
import { Button } from "./Button";
import { TextArea } from "./TextArea";
import { Card } from "./Card";
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
                <Card variant="default" size="large" className={styles.promptSection}>
                    <h3 className={styles.promptSectionTitle}>
                        <Icon name="ChatCircle" size={24} />
                        Chatbot Instructions
                    </h3>
                    <p className={styles.promptSectionDescription}>
                        Edit the chatbot's behavior and personality in real-time
                    </p>
                    <div className={styles.promptEditor}>
                        <TextArea
                            value={chatbotPrompt}
                            onChange={setChatbotPrompt}
                            placeholder="Enter chatbot instructions..."
                            rows={6}
                        />
                        <div className={styles.promptInfo}>
                            <Icon name="Info" size={14} />
                            <span>Changes apply to new conversations</span>
                        </div>
                    </div>
                </Card>

                {/* Status Controls - Row Layout */}
                <div className={styles.statusControlsGrid}>
                    {/* Connection Status */}
                    <Card variant="elevated" size="medium" className={styles.statusControlCard}>
                        <h3 className={styles.statusControlTitle}>
                            <Icon name="PowerIcon" size={20} />
                            Connection Status
                        </h3>
                        <p className={styles.statusControlDescription}>
                            The chat only answers when the widget is online
                        </p>
                        <div className={styles.statusButtons}>
                            <Button
                                onClick={() => setIsOnline(!isOnline)}
                                variant={isOnline ? "primary" : "outline"}
                                size="medium"
                                icon={{ name: "PowerIcon", size: 16, position: "left" }}
                            >
                                {isOnline ? 'Online' : 'Offline'}
                            </Button>
                        </div>
                    </Card>

                    {/* Maintenance Mode */}
                    <Card variant="elevated" size="medium" className={styles.statusControlCard}>
                        <h3 className={styles.statusControlTitle}>
                            <Icon name="Wrench" size={20} />
                            Maintenance Mode
                        </h3>
                        <p className={styles.statusControlDescription}>
                            You cannot send messages when the widget is in maintenance mode
                        </p>
                        <div className={styles.maintenanceButtons}>
                            <Button
                                onClick={() => setIsMaintenanceMode(!isMaintenanceMode)}
                                variant={isMaintenanceMode ? "primary" : "outline"}
                                size="medium"
                                icon={{ name: "Wrench", size: 16, position: "left" }}
                            >
                                {isMaintenanceMode ? 'Maintenance Mode ON' : 'Maintenance Mode OFF'}
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Clear Site Data */}
                <Card variant="default" size="medium" className={styles.clearDataSection}>
                    <h3 className={styles.clearDataTitle}>
                        <Icon name="Trash" size={20} />
                        Reset conversation
                    </h3>
                    <p className={styles.clearDataDescription}>
                        Delete all stored messages
                    </p>
                    <Button
                        variant="danger"
                        size="medium"
                        onClick={clearSiteData}
                        icon={{ name: "Trash", size: 16, position: "left" }}
                    >
                        Clear chat history
                    </Button>
                </Card>
            </div>
        </section>
    );
}
