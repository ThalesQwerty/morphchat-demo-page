import { useState } from "react";
import { Icon } from "morphchat";
import { useDemoContext } from "../context/DemoContext";
import { Button } from "./Button";
import { TextArea } from "./TextArea";
import { Input } from "./Input";
import { Card } from "./Card";
import { ConfirmationDialog } from "./ConfirmationDialog";
import styles from "./FunctionalitySection.module.scss";

export function FunctionalitySection() {
    const [showResetDialog, setShowResetDialog] = useState(false);
    
    const { 
        chatbotPrompt, 
        setChatbotPrompt, 
        introTitle,
        setIntroTitle,
        introSubtitle,
        setIntroSubtitle,
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
                    Customize Prompt Instructions & Status
                </h2>
                <p className={styles.functionalitySubtitle}>
                    Configure the chatbot behavior, intro message, and connection settings
                </p>

                {/* First Row: Instructions and Intro (2 columns) */}
                <div className={styles.firstRow}>
                    {/* Chatbot Prompt Editor */}
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

                    {/* Intro Configuration */}
                    <Card variant="default" size="large" className={styles.promptSection}>
                        <h3 className={styles.promptSectionTitle}>
                            <Icon name="HandWaving" size={24} />
                            Intro Configuration
                        </h3>
                        <p className={styles.promptSectionDescription}>
                            Customize the welcome message that appears when users open the chat
                        </p>
                        <div className={styles.introEditor}>
                            <div className={styles.introInputGroup}>
                                <label className={styles.introLabel}>Intro Title</label>
                                <Input
                                    value={introTitle}
                                    onChange={setIntroTitle}
                                    placeholder="Enter intro title..."
                                />
                            </div>
                            <div className={styles.introInputGroup}>
                                <label className={styles.introLabel}>Intro Subtitle</label>
                                <Input
                                    value={introSubtitle}
                                    onChange={setIntroSubtitle}
                                    placeholder="Enter intro subtitle..."
                                />
                            </div>
                            <div className={styles.promptInfo}>
                                <Icon name="Info" size={14} />
                                <span>Changes apply immediately to the chat widget</span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Second Row: Status Controls (3 columns) */}
                <div className={styles.secondRow}>
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

                    {/* Clear Site Data */}
                    <Card variant="elevated" size="medium" className={styles.statusControlCard}>
                        <h3 className={styles.statusControlTitle}>
                            <Icon name="Trash" size={20} />
                            Reset conversation
                        </h3>
                        <p className={styles.statusControlDescription}>
                            Delete all stored messages
                        </p>
                        <div className={styles.clearDataButtons}>
                            <Button
                                variant="danger"
                                size="medium"
                                onClick={() => setShowResetDialog(true)}
                                icon={{ name: "Trash", size: 16, position: "left" }}
                            >
                                Clear chat history
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
            
            {/* Confirmation Dialog for Reset Chat */}
            <ConfirmationDialog
                isOpen={showResetDialog}
                onClose={() => setShowResetDialog(false)}
                onConfirm={clearSiteData}
                title="Reset Chat History"
                message="Are you sure you want to clear all chat messages? This action cannot be undone."
                confirmText="Clear All Messages"
                cancelText="Cancel"
                variant="danger"
                icon="Trash"
            />
        </section>
    );
}
