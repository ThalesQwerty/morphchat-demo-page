import { Icon } from "morphchat";
import { useDemoContext } from "../context/DemoContext";
import { Card } from "./Card";
import styles from "./ActionManagementSection.module.scss";

export function ActionManagementSection() {
    const { 
        actions,
        toggleAction, 
    } = useDemoContext();

    return (
        <section id="actions" className={styles.actionManagementSection}>
            <div className={styles.actionManagementContainer}>
                <h2 className={styles.actionManagementTitle}>
                    Manage Actions
                </h2>
                <p className={styles.actionManagementSubtitle}>
                    Enable or disable specific chat actions. You can trigger enabled actions by sending a message to the chatbot asking it to do them.
                </p>

                <div className={styles.actionsList}>
                    {actions.map((action) => {
                        const isEnabled = !action.disabled;
                        
                        return (
                            <Card
                                key={action.name}
                                variant={isEnabled ? "outlined" : "default"}
                                size="medium"
                                hover={true}
                                onClick={() => toggleAction(action.name)}
                                className={`${styles.actionItem} ${isEnabled ? styles.actionEnabled : styles.actionDisabled}`}
                            >
                                <div className={styles.actionContent}>
                                    <input
                                        type="checkbox"
                                        checked={isEnabled}
                                        onChange={() => toggleAction(action.name)}
                                        className={styles.actionCheckbox}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                    <div className={styles.actionIcon}>
                                        <Icon name={action.metadata?.icon!} size={28} />
                                    </div>
                                    <div className={styles.actionText}>
                                        <span className={styles.actionDescription}>
                                            {action.description}
                                        </span>
                                        <span className={styles.actionStatus}>
                                            {isEnabled ? 'Enabled' : 'Disabled'}
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>

                <div className={styles.actionsInfo}>
                    <div className={styles.actionsCount}>
                        <Icon name="Info" size={16} />
                        <span>
                            {actions.filter(action => !action.disabled).length} of {actions.length} actions enabled
                        </span>
                    </div>
                    <p className={styles.actionsNote}>
                        Give it a try! Send a message to the chatbot asking it to do some of the enabled actions above.<br/>
                        (ex: "change the theme to red")
                    </p>
                </div>
            </div>
        </section>
    );
}
