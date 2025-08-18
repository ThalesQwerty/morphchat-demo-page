import { Icon } from "../../lib/components/layout/Icon";
import { useDemoContext } from "../context/DemoContext";
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
                    Chat Actions Management
                </h2>
                <p className={styles.actionManagementSubtitle}>
                    Enable or disable specific chat actions. Only enabled actions will be available in the chat widget.
                </p>

                <div className={styles.actionsList}>
                    {actions.map((action) => {
                        const isEnabled = !action.disabled;
                        
                        return (
                            <div 
                                key={action.name} 
                                className={`${styles.actionItem} ${isEnabled ? styles.actionEnabled : styles.actionDisabled}`}
                            >
                                <label className={styles.actionLabel}>
                                    <input
                                        type="checkbox"
                                        checked={isEnabled}
                                        onChange={() => toggleAction(action.name)}
                                        className={styles.actionCheckbox}
                                    />
                                    <div className={styles.actionContent}>
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
                                </label>
                            </div>
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
                        Disabled actions will not be available in the chat widget. Users won't be able to use these functions.
                    </p>
                </div>
            </div>
        </section>
    );
}
