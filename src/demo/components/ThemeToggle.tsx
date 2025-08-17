import { useAppTheme } from "../context/ThemeContext";
import styles from "./ThemeToggle.module.scss";

export function ThemeToggle() {
    const { theme, setTheme } = useAppTheme();

    return (
        <div className={styles.themeToggle}>
            <button
                className={`${styles.themeButton} ${theme === "light" ? styles.active : ""}`}
                onClick={() => setTheme("light")}
                title="Light mode"
            >
                ☀️
            </button>
            <button
                className={`${styles.themeButton} ${theme === "dark" ? styles.active : ""}`}
                onClick={() => setTheme("dark")}
                title="Dark mode"
            >
                🌙
            </button>
            <button
                className={`${styles.themeButton} ${theme === "auto" ? styles.active : ""}`}
                onClick={() => setTheme("auto")}
                title="Auto (system preference)"
            >
                🔄
            </button>
        </div>
    );
}
