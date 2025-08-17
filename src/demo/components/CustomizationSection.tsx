import React from "react";
import { Color } from "../../lib/constants/Color";
import { Icon } from "../../lib/components/layout/Icon";
import { useAppTheme } from "../context/ThemeContext";
import { useDemoContext } from "../context/DemoContext";
import styles from "./CustomizationSection.module.scss";

export function CustomizationSection() {
    const { colorTheme, setColorTheme, theme, setTheme } = useAppTheme();
    const { widgetCorner, setWidgetCorner } = useDemoContext();

    return (
        <section id="customization" className={styles.customizationSection}>
            <div className={styles.customizationContainer}>
                <h2 className={styles.customizationTitle}>
                    Customize Your Theme
                </h2>
                <p className={styles.customizationSubtitle}>
                    Choose from our beautiful color palette to match your brand
                </p>
                
                <div className={styles.colorGrid}>
                    {Object.keys(Color)
                        .filter(colorName => !colorName.startsWith('gray') && colorName !== 'white' && colorName !== 'black')
                        .map((colorName) => (
                            <button
                                key={colorName}
                                onClick={() => setColorTheme(Color[colorName as keyof typeof Color])}
                                className={`${styles.colorButton} ${colorTheme === Color[colorName as keyof typeof Color] ? styles.colorButtonSelected : styles.colorButtonDefault}`}
                                style={{ background: Color[colorName as keyof typeof Color] }}
                                title={colorName}
                            >
                                {colorTheme === Color[colorName as keyof typeof Color] && (
                                    <div className={styles.checkmark}>
                                        <Icon name="Check" size={24} color="white" />
                                    </div>
                                )}
                            </button>
                        ))}
                </div>
                
                <div className={styles.currentTheme}>
                    <p>
                        Current theme: <strong>{Object.keys(Color).find(key => Color[key as keyof typeof Color] === colorTheme)}</strong>
                    </p>
                </div>

                {/* Control Sections Container */}
                <div className={styles.controlSectionsContainer}>
                    {/* Color Mode Switch */}
                    <div className={styles.controlSection}>
                        <h3 className={styles.controlTitle}>Color Mode</h3>
                        <p className={styles.controlSubtitle}>
                            Choose your preferred color scheme
                        </p>
                        <div className={styles.modeButtons}>
                            {(["light", "dark", "auto"] as const).map((mode) => (
                                <button
                                    key={mode}
                                    onClick={() => setTheme(mode)}
                                    className={`${styles.modeButton} ${theme === mode ? styles.modeButtonSelected : styles.modeButtonDefault}`}
                                >
                                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Widget Corner Position Switch */}
                    <div className={styles.controlSection}>
                        <h3 className={styles.controlTitle}>Widget Position</h3>
                        <p className={styles.controlSubtitle}>
                            Choose which corner the chat widget will appear in
                        </p>
                        <div className={styles.cornerButtons}>
                            {(["left", "right"] as const).map((corner) => (
                                <button
                                    key={corner}
                                    onClick={() => setWidgetCorner(corner)}
                                    className={`${styles.cornerButton} ${widgetCorner === corner ? styles.cornerButtonSelected : styles.cornerButtonDefault}`}
                                >
                                    {corner.charAt(0).toUpperCase() + corner.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
