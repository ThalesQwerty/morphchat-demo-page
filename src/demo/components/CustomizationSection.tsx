import { Color, Icon } from "morphchat";
import { useAppTheme } from "../context/ThemeContext";
import { useDemoContext } from "../context/DemoContext";
import { Button } from "./Button";
import styles from "./CustomizationSection.module.scss";

export function CustomizationSection() {
    const { colorTheme, setColorTheme, theme, setTheme } = useAppTheme();
    const { widgetCorner, setWidgetCorner } = useDemoContext();

    return (
        <section id="customization" className={styles.customizationSection}>
            <div className={styles.customizationContainer}>
                <h2 className={styles.customizationTitle}>
                    Customize Theme, Color Mode & Orientation
                </h2>
                <p className={styles.customizationSubtitle}>
                    Choose your preferred theme colors, color mode, and widget position
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
                                <Button
                                    key={mode}
                                    onClick={() => setTheme(mode)}
                                    variant={theme === mode ? "primary" : "outline"}
                                    size="medium"
                                >
                                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                                </Button>
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
                                <Button
                                    key={corner}
                                    onClick={() => setWidgetCorner(corner)}
                                    variant={widgetCorner === corner ? "primary" : "outline"}
                                    size="medium"
                                >
                                    {corner.charAt(0).toUpperCase() + corner.slice(1)}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
